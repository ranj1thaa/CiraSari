const mongoose=require('mongoose')
const User = require('./User')
const sareeSchema=new mongoose.Schema({
  worker:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true
  },
  title:{
    type:String,
    required:true,
    trim:true
  },
  images:{
    type:[String],
    default:[]
  },
  price:{
    type:Number,
    required:true
  },
  fabric:{
    type:String,
    required:true
  },
  technique:{
    type:String,
  },
  region:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: User,
    }
  ],
  isPublished: {
    type: Boolean,
    default: true,
  },
},{ timestamps: true })

const SareeCol=mongoose.model('SareeCol', sareeSchema)
module.exports=SareeCol