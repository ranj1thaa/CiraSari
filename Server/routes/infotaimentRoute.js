const express= require('express')
const { getFeed, createPost, deletePost, toogleLike } = require('../controllers/infotaimentController')
const authCheck = require('../middlewares/authCheck')
const upload = require('../middlewares/upload')
const router=express.Router()


router.get('/',authCheck ,getFeed)
router.post('/', authCheck,upload.fields([
  { name: "images", maxCount: 5 },
  { name: "videos", maxCount: 2 },
]),createPost)
router.delete('/:id', authCheck, deletePost)
router.post('/:id/like',authCheck, toogleLike)
module.exports=router