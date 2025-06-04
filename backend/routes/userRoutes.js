import express from "express";
import {postUser,getUsers,deleteUser,updateUser} from "../controllers/userController.js"
const router=express.Router()

router.post("/postUser",postUser)
router.get("/getUsers",getUsers)
router.delete("/deleteUser",deleteUser)
router.put("/updateUser",updateUser)

export default router