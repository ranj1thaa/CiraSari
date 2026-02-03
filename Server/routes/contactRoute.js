const express=require('express')
const { contact } = require('../controllers/contactController')
const router=express.Router()

router.post('/feedback', contact)
module.exports=router