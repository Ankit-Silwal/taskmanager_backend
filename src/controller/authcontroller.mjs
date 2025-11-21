import bcrypt from "bcrypt";
import User from "../models/Users.mjs";
export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.json({ msg: "Please provide all the required credentials" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ msg: "Crap this email already exists :{" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
    return res.status(201).json({
      success: true,
      user: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error registering",
      error: err.message
    });
  }
};
export const loginUser=async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "There is no user with this email"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    }
    return res.status(200).json({
      success: true,
      message: "login successful",
      user: {
        username: user.username,
        email: user.email,
      }
    });
  }catch(err){
    return res.status(500).json({
      success:false,
      msg:"Unable to login",
      error:err.message
    })
  }
}
