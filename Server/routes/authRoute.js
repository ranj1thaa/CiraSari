const express=require('express')
const { login, signup, me, logout } = require('../controllers/authController')
const router=express.Router()
const authCheck=require('../middlewares/authCheck')

router.post('/login', login)
router.post('/signup', signup)
router.get('/me', authCheck, me )
router.post('/logout', logout)

module.exports=router