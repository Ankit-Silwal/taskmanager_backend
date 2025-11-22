import jwt from "jsonwebtoken"
import User from "../models/Users.mjs"
export const protect=async (req,res,next)=>{
  try{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token){
      return res.status(401).json({
        success:false,
        msg:"The user isnt autorized"})
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded);
    req.user=await User.findById(decoded.id).select("-password")
    if(!req.user){
      return res.status(401).json({
        success:false,
        message:"The user wasnt found"
      })
      next();
    }
  }catch(err){
    return res.json({
      success:false,
      message:"Unauthorized",
      error:err.message
    })
  }
}