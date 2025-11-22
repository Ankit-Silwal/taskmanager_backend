import { Router } from "express";
import { create,read,deleteTodo,update, getAllTodos } from "../controller/todocontroller.mjs";
import { checkid } from "../middlewares/idmiddleware.mjs";
import { protect } from "../middlewares/authMiddlewares.mjs";
const router=Router()
router.post("/create", protect, create);
router.get("/getall", protect, getAllTodos);
router.get("/get/:id", protect, checkid, read);
router.put("/update/:id", protect, checkid, update);
router.delete("/delete/:id", protect, checkid, deleteTodo);
export default router;