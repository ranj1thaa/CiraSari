const WrapAsync = require('../components/wraps/wrapAsync')
const transporter=require('../utils/mailer')

exports.contact=WrapAsync(async(req, res)=>{
  const {name, email, phoneNo, description, type}=req.body

  if( !name || !email || !description){
    return res.status(400).json({ message: "All required fields missing" });
  }
  try{
    const mailerOption={
      from:email,
      to:process.env.ADMIN_EMAIL,
      subject: `CiraSari | ${type}`,
      html: `
        <h3>FeedBack/Complaint</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phoneNo || "N/A"}</p>
        <p><b>Description:</b></p>
        <p>${description}</p>
        <p><b>Type:</b> ${type}</p>
    	`,
    }
    await transporter.sendMail(mailerOption)
    res.status(200).json({ message: "Feedback sent successfully" });
  }catch(err){
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send feedback" });
  }
})