
import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./utils/connections.js";
import connectCloudinary from "./utils/cloudinary.js"
import Adminrouter from "./routes/adminRoutes.js"
import UserRouter from "./routes/UserRouter.js";
import doctorRouter from "./routes/doctorsRoutes.js"




// make app
const app=express();
const PORT = process.env.PORT || 4001
connectDB()
connectCloudinary()

// middelewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Enable CORS
app.use(cors({
  origin: 'https://doctor-appointment-a9nj.vercel.app', // Your Vercel frontend
  credentials: true //  using cookies 
}));


// Routes
app.use('/api/user', UserRouter);
app.use('/api/admin', Adminrouter);
app.use("/api/doctor", doctorRouter);

app.get('/',(req,res)=>{
  res.send("API WORKING PROPERLY");    
});

app.listen(PORT,()=>{
    console.log(`Server started on port: ${PORT}`)
})




