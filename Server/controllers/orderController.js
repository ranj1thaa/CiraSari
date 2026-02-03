const WrapAsync = require("../components/wraps/wrapAsync");
const Order = require("../models/Order");
const SareeCol = require("../models/SareeCollection");

exports.createOrder = WrapAsync(async (req, res) => {
  const { sareeID, orderType, message } = req.body;

  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Only customers can place orders" });
  }

  if (!sareeID || !orderType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const saree = await SareeCol.findById(sareeID);
  if (!saree) {
    return res.status(404).json({ message: "Saree not found" });
  }

  const order = new Order({
    saree: saree._id,
    customer: req.user.id,
    worker: saree.worker,
    orderType,
    message: message
      ? [{
          sender: req.user.id,
          text: message,
        }]
      : [],
  });

  await order.save();

  res.status(201).json({
    message: "Order placed successfully",
    order,
  });
});


exports.getMyCart=WrapAsync(async(req, res)=>{
  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Access denied" });
  }

  const cartItems = await Order.find({
    customer: req.user.id,
    orderType: "cart",
    status: "pending",
  })
    .populate("saree")
    .populate("worker", "name profilePic")
    .sort({ createdAt: -1 });

  res.json(cartItems);
})

exports.removeFromCart=WrapAsync(async(req, res)=>{
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: "Cart item not found" });
  }
  if (order.customer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await order.deleteOne()
  res.json({message:"removed from cart"})
})


exports.getWorkerOrders = WrapAsync(async (req, res) => {
  if (req.user.role !== "worker") {
    return res.status(403).json({ message: "Access denied" });
  }

  const orders = await Order.find({
    worker: req.user.id,
  })
    .populate("saree")
    .populate("customer", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});


exports.updateOrderStatus=WrapAsync(async(req, res)=>{
  const {id}=req.params
  const {status}=req.body

  const allowedStatus = ["accepted", "rejected", "completed"];
  if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"Invalid Status"})
  }
  const order=await Order.findById(id)
  if(!order){
    return res.status(404).json({message:"Order not found"})
  }
  if(order.worker.toString()!==req.user.id){
    return res.status(403).json({message:"Not Authorized"})
  }
  order.status=status
  await order.save()
  res.json(order)
})

exports.addOrderMessage=WrapAsync(async(req, res)=>{
  const {id}=req.params
  const {text}=req.body
  const order=await Order.findById(id)
  if(!order){
    return res.status(404).json({message:"Order not found"})
  }
  const isAllowed=order.customer.toString()===req.user.id || order.worker.toString()===req.user.id 

  if(!isAllowed){
    return res.status(403).json({message:"Not Authorized"})
  }

  order.message.push({
    sender:req.user.id,
    text
  })

  await order.save()

  res.json(order)
})

exports.placeOrderFromCart = WrapAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.customer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  order.orderType = "buy";
  order.status = "pending";
  await order.save();

  res.json(order);
});


exports.getMyOrders = WrapAsync(async (req, res) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Access denied" });
  }

  const orders = await Order.find({
    customer: req.user.id,
    orderType: { $ne: "cart" }
  })
    .populate("saree")
    .populate("worker", "name profilePic")
    .sort({ createdAt: -1 });

  res.json(orders);
});
