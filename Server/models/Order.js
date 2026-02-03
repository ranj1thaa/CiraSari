const mongoose= require("mongoose");
const SareeCol = require("./SareeCollection");
const User = require("./User");

const orderSchema=new mongoose.Schema({
  saree:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SareeCol",
    required: true,
  },
  customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  worker:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  orderType:{
    type: String,
    enum: ["enquiry", "cart", "buy"],
    required: true,
  },
  message:[
    {
      sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      text:String,
      createdAt:{
        type:Date,
        default:Date.now()
      }
    }
  ],
  status:{
    type:String,
    enum:["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  payment: {
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
    paymentIntentId: String,
    amount: Number,
  },
},{timestamps: true })

const Order=mongoose.model("Order", orderSchema)

module.exports=Order