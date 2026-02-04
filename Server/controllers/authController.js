const WrapAsync= require('../components/wraps/wrapAsync')
const User=require('../models/User')
const ExpressError=require('../components/errorsHandle/expressError')
const bcrypt=require('bcrypt')
const tokens= require('../middlewares/authMiddleware')


exports.login=WrapAsync(async(req, res)=>{
  const {email, password}=req.body
  if(!email || !password){
    throw new ExpressError(400, "Email & password required")
  }

  const existingUser= await User.findOne({email})
  if(!existingUser){
     throw new ExpressError(404, "User Not Found. Try Register")
  }

  const isMatch=await bcrypt.compare(password, existingUser.password)
  if(!isMatch){
    throw new ExpressError(401, "Invalid credentials")
  }

  const token=tokens(existingUser)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.cookie("accessToken", token,{
    httpOnly: true,
    secure: true,      
    sameSite: "none",
    maxAge: 15 * 60 * 1000,
  })

  res.status(200).json({
    message:"Logged In",
    user:{
      id:existingUser._id,
      email:existingUser.email,
      name:existingUser.name,
      role:existingUser.role
    }
  })
})

exports.signup=WrapAsync(async(req, res)=>{
  const {name, email, password, phone, role}=req.body

  if(!email || !name || !password || !phone){
    throw new ExpressError(400, "All fields required")
  }

  const existingUser=await User.findOne({email})
  if(existingUser){
    throw new ExpressError(409, "User already exists")
  }

  const hashedPwd= await bcrypt.hash(password, 10)

  const user=new User({
    name:name,
    email:email,
    password:hashedPwd,
    phone:phone,
    role:role
  })

  await user.save()

  const token=tokens(user)
  if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
  }
  res.cookie("accessToken", token,{
    httpOnly: true,
    secure: true,      
    sameSite: "none",
    maxAge: 15 * 60 * 1000,
  })

  res.status(201).json({
    message: "Signup successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
})

exports.me=WrapAsync(async(req, res)=>{
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
})

exports.logout=WrapAsync(async(req, res)=>{
  res.clearCookie("accessToken", {
    httpOnly: none,
    sameSite: "lax",
    secure: true,
  })
   res.status(200).json({ message: "Logged out" });
})
