const WrapAsync = require("../components/wraps/wrapAsync");
const SareeCol = require("../models/SareeCollection");
const User = require("../models/User");

exports.createSaree=WrapAsync(async(req, res)=>{
  if (!req.body.title || !req.body.price || !req.body.fabric || !req.body.region) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if(req.user.role!=="worker"){
    return res.status(403).json({ message: "Only workers can add sarees" });
  }

  const images=req.files?.images?.map(f=>f.path) ||[]

  const saree = new SareeCol({
    worker: req.user.id,
    title: req.body.title,
    price: req.body.price,
    fabric: req.body.fabric,
    technique: req.body.technique,
    region: req.body.region,
    description: req.body.description,
    images,
  });

  await saree.save()
  res.status(201).json(saree);
})

exports.getAllSaree=WrapAsync(async(req, res)=>{
  const sarees=await SareeCol.find({isPublished:true})
    .populate("worker", "_id name profilePic")
    .sort({ createdAt: -1 })
  res.json(sarees)
})

exports.deleteSaree=WrapAsync(async(req, res)=>{
  const {id}=req.params
  const saree= await SareeCol.findById(id)
  if(!saree) return res.status(404).json({ message: "Saree not found" });
  if (saree.worker.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to delete this saree" });
  }
  await SareeCol.findByIdAndDelete(id);
  res.status(200).json({ message: "Saree deleted successfully", id });
})

exports.updateSaree=WrapAsync(async(req,res)=>{
  const {id}=req.params
  const saree=await SareeCol.findById(id)
  if(!saree) return res.status(404).json({ message: "Saree not found" });
  if (saree.worker.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to delete this saree" });
  }
  const { title, price, fabric, technique, region, description } = req.body;
  if (title) saree.title = title;
  if (price) saree.price = price;
  if (fabric) saree.fabric = fabric;
  if (technique) saree.technique = technique;
  if (region) saree.region = region;
  if (description) saree.description = description;

  if (req.files?.images) {
    const newImages = req.files.images.map(f => f.path);
    saree.images = newImages; 
  }
  await saree.save();
  res.json(saree);
})

exports.getMySaree=WrapAsync(async(req, res)=>{
  if(req.user.role!=="worker"){
    return res.status(403).json({ message: "Access denied" });
  }

  const saree= await SareeCol.find({ worker: req.user.id })
    .sort({ createdAt: -1 });

  res.json(saree);
})

exports.getSingleSaree=WrapAsync(async(req, res)=>{
  const {id}=req.params
  const saree=await SareeCol.findById(id)
    .populate('worker', "_id name profilePic")

  if (!saree) {
    return res.status(404).json({ message: "Saree not found" });
  }

  res.json(saree);
})



exports.getWorkerProfile = WrapAsync(async (req, res) => {
  const worker = await User.findById(req.params.id)
    .select("name bio profilePic");

  if (!worker) {
    return res.status(404).json({ message: "Worker not found" });
  }

  res.json(worker);
});

exports.getSareeByWorker = WrapAsync(async (req, res) => {
  const sarees = await SareeCol.find({
    worker: req.params.id,
    isPublished: true
  }).sort({ createdAt: -1 });

  res.json(sarees);
});
