const express= require('express')
const app= express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/authRoute')
const sareeProcessRoute=require('./routes/sareeProcessRoute')
const infotaimentRoute=require('./routes/infotaimentRoute')
const feedback= require('./routes/contactRoute')
const sareeRoute=require('./routes/sareeRoute')
const orderRoute=require('./routes/orderRoute')
const stripeRoute=require('./routes/stripe')

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
  "http://localhost:5173", 
  "https://cira-sari.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin like mobile apps or curl
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


app.use('/auth', authRoute)
app.use('/saree/making', sareeProcessRoute)
app.use('/infotainment', infotaimentRoute)
app.use('/contact', feedback)
app.use('/saree', sareeRoute)
app.use('/order', orderRoute)
app.use('/stripe', stripeRoute);

app.use((err,req, res, next)=>{
  const { status = 500, message = "Something went wrong" } = err
  res.status(status).json({ message })
})
module.exports=app
