const WrapAsync = require("../components/wraps/wrapAsync");
const Infotainment = require("../models/Infotainment")
exports.createPost=WrapAsync(async(req, res)=>{
  if (req.user.role !== "worker") {
    return res.status(403).json({ message: "Only workers can post" });
  }
  if (!req.body.content && (!req.body.images || !req.body.images.length)) {
    return res.status(400).json({ message: "Post cannot be empty" });
  }

  const images = req.files?.images?.map(f => f.path) || [];
  const videos = req.files?.videos?.map(f => f.path) || [];

  const post=new Infotainment({
    worker:req.user.id,
    content:req.body.content,
    images,
    videos
  })
  await post.save()
  res.status(201).json(post);
})

exports.getFeed = WrapAsync(async (req, res) => {
  const posts = await Infotainment.find()
    .populate("worker", "name profilePic")
    .sort({ createdAt: -1 })
    .lean();

  const userId = req.user?.id;

  const formatted = posts.map((p) => ({
    ...p,
    likesCount: p.likes.length,
    isLiked: userId ? p.likes.some(id => id.toString() === userId) : false,
  }));

  res.json(formatted);
});



exports.deletePost=WrapAsync(async(req, res)=>{
  const post=await Infotainment.findById(req.params.id)
  if(!post) return res.status(404).json({ message: "Post not found" });
  if(post.worker.toString() !==req.user.id){
    return res.status(403).json({ message: "Not allowed" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
})


exports.toogleLike=WrapAsync(async(req, res)=>{
  const post = await Infotainment.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const userId = req.user.id.toString();

  const index = post.likes.findIndex(
    (id) => id.toString() === userId
  )

  if (index === -1) {
    post.likes.push(req.user.id);
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();
  res.json({ likes: post.likes.length });
})
