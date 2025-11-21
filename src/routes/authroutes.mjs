import { Router } from "express";
import { loginUser, registerUser } from "../controller/authcontroller.mjs";
const router=Router()
router.post('/register',registerUser)
router.post('/login',loginUser)
export default router