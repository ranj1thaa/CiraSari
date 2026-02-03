require('dotenv').config()
const Connect = require('./config/db')
const app=require('./index')

Connect().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log("Port Started")
  })
})