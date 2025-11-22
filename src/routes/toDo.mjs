import { Router } from "express";
import { create,read,deleteTodo,update } from "../controller/todocontroller.mjs";
import { checkid } from "../middlewares/idmiddleware.mjs";
router=Router()
router.get("/create",create);
router.get("/read",checkid,read);
router.get("/update",checkid,update);
router.get("/delete",checkid,deleteTodo);
export default router;