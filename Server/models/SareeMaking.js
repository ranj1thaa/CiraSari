const mongoose=require('mongoose')
const sareeMakingSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  images:{
    type:[String]
  },
  videos:{
    type:[String]
  },
  order: {
    type: Number,
    required: true,
  },
  regions: [
    {
      district: String,
    },
  ],

  links: [
    {
      url: String,
      type: {
        type: String,
        enum: ["youtube", "article", "reference"],
      },
    },
  ],
}, { timestamps: true })

const SareeMaking=mongoose.model("SareeMaking", sareeMakingSchema)
module.exports=SareeMaking