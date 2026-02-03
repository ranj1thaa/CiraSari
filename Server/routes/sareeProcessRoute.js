const express=require('express')
const { getSareeProcess } = require('../controllers/sareeMakingController')
const router=express.Router()

router.get('/process', getSareeProcess)
module.exports=router