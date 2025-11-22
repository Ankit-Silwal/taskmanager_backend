import { Router } from "express";
import { create,read,deleteTodo,update } from "../controller/todocontroller.mjs";
import { checkid } from "../middlewares/idmiddleware.mjs";
const router=Router()
router.post("/create", create);
router.get("/read",checkid,read);
router.put("/update",checkid,update);
router.delete("/delete",checkid,deleteTodo);
export default router;