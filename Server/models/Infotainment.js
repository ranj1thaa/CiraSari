const mongoose=require('mongoose')

const infoSchema=new mongoose.Schema({
  worker:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  content:{
    type:String,
    required:true
  },
  images:{
    type:[String],
    default:[]
  },
  videos: {
    type: [String],
    default: [],
  },
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
  ],
  share:{
    type:Number,
    default:0
  }
},
{ timestamps: true }
)

const Infotainment=mongoose.model("Infotainment", infoSchema)
module.exports=Infotainment