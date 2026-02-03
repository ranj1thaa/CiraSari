const SareeMaking=require('../models/SareeMaking')
const WrapAsync=require('../components/wraps/wrapAsync')

exports.getSareeProcess=WrapAsync(async(req, res)=>{
  const steps=await SareeMaking.find().sort({order:1})
  res.json(steps)
})