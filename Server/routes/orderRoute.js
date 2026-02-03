const express=require('express')
const authCheck = require('../middlewares/authCheck')
const { createOrder, getMyCart, removeFromCart, getWorkerOrders, updateOrderStatus, addOrderMessage, placeOrderFromCart, getMyOrders } = require('../controllers/orderController')
const router=express.Router()

router.post('/createOrder', authCheck, createOrder )
router.get('/get-my-cart', authCheck, getMyCart)
router.delete('/cart/:id', authCheck, removeFromCart)
router.get('/worker',authCheck, getWorkerOrders)
router.put('/:id/status', authCheck, updateOrderStatus)
router.post('/:id/message', authCheck, addOrderMessage)
router.post("/cart/buy/:id", authCheck, placeOrderFromCart)
router.get('/get-my-orders', authCheck, getMyOrders)
module.exports=router