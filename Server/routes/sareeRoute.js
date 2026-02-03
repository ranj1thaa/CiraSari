const express=require('express')
const { createSaree, getAllSaree, deleteSaree, updateSaree, getMySaree, getSingleSaree, getSareeByWorker, getWorkerProfile } = require('../controllers/sareeController')
const authCheck = require('../middlewares/authCheck')
const upload = require('../middlewares/upload')
const router=express.Router()

router.post('/createSaree',authCheck,upload.fields([{name:'images', maxCount:5 }]) , createSaree)
router.get('/getSaree', getAllSaree)
router.delete('/delete/:id',authCheck, deleteSaree)
router.put('/update/:id',authCheck, upload.fields([{ name: 'images', maxCount: 5 }]),updateSaree)
router.get('/my-saree', authCheck, getMySaree)
router.get('/detail-saree/:id',authCheck, getSingleSaree)
router.get("/worker/:id", getWorkerProfile);
router.get("/worker/:id/sarees",getSareeByWorker)
module.exports=router 