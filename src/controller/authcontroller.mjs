import bcrypt from "bcrypt";
import User from "../models/Users.mjs";
export const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      return res.json({ msg: "Please provide all the required credentials" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ msg: "Crap this email already exists :{" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
    return res.status(201).json({
      success: true,
      user: newUser.name,
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
