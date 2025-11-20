import mongoose from "mongoose";
const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("The Data base is connected")
  }catch(err){
    console.log(`The database wasnt able to connect due to ${err.message}`)
  }
}
export default connectDB;