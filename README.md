CiraSari – Connecting Traditional Saree Weavers with Customers
CiraSari is a full-stack MERN web application designed to empower traditional saree weavers by providing a digital platform where they can showcase, sell, and manage saree orders directly with customers.
The platform bridges the gap between artisans and buyers by enabling secure payments, direct communication, order management, and feedback handling.

Key Features
Weaver (Seller) Features
  Create and manage saree listings with images stored on Cloudinary
  Receive and manage customer orders
  Communicate directly with customers through order-based messaging
  Track order status (Pending, Accepted, Completed)
  Secure authentication and role-based access

Customer Features
  Browse sarees from multiple weavers
  Add sarees to cart and place orders
  Secure online payments using Stripe
  Communicate with weavers regarding orders
  Submit feedback or complaints via contact form
  Google OAuth login support

Feedback & Support System
  Customer feedback and complaint form
  Automated email notifications sent to admin using Nodemailer
  Categorized complaints (Order Issue, Payment Issue, Product Quality, etc.)

Tech Stack
Frontend
React.js (Vite)
React Router DOM
Axios
Tailwind CSS
Bootstrap & React-Bootstrap
GSAP (Animations)
Swiper.js (Carousels)
React Toastify (Notifications)
Stripe React SDK
Backend
Node.js
Express.js
MongoDB & Mongoose
JWT Authentication
Bcrypt (Password hashing)
Stripe API (Payments)
Cloudinary (Image uploads)
Multer (File handling)
Nodemailer (Email service)
Cookie-Parser & CORS

Core Implementations
🔐Authentication & Authorization

JWT-based authentication

Secure password hashing using bcrypt

Role-based access control (Customer / Weaver)

Google OAuth login integration

🛒 Order & Cart System

Customers can add sarees to cart or directly place orders

Orders are stored with status tracking

Order-level messaging between customer and weaver

Workers can accept, reject, or complete orders

💳 Stripe Payment Integration

Stripe Payment Intent for secure transactions

Frontend handles payment confirmation

Backend verifies and updates payment status

Secure and scalable checkout flow

🖼 Image Uploads

Saree images uploaded using Multer

Stored securely on Cloudinary

Optimized for performance and scalability

📩 Feedback & Email System

Contact/complaint form connected to backend

Nodemailer sends structured emails to admin

Error handling and validation included

🌟 Standout Highlights

Complete end-to-end MERN stack application

Real-world e-commerce & artisan marketplace use case

Secure payment flow with Stripe

Clean separation of frontend and backend

Production-ready architecture and environment configuration

User-friendly UI with animations and responsive design

🔮 Future Enhancements

Real-time chat using Socket.IO

Admin dashboard for platform monitoring

Order analytics for weavers

Push notifications

Invoice download feature

Review & rating system

⚙️ Installation & Setup
Backend Setup
cd server
npm install
npm run dev


Create .env file:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key
ADMIN_EMAIL=your_email
EMAIL_PASS=your_email_password

Frontend Setup
cd client
npm install
npm run dev

📚 Learning Outcomes

Built a scalable MERN stack application

Integrated Stripe payments securely

Implemented authentication & authorization

Hands-on experience with Cloudinary & Nodemailer

Designed a real-world artisan marketplace solution
