import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
          console.log("Database Connection Success");
        
    } catch (error) {
        console.log("Database connection Error");
        
    }
  
}
export default connectDB 