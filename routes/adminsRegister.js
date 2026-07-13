import express from "express";
import adminsRegister from "../controllers/adminsRegister.js";

const router = express.Router();

router.route("/").post(adminsRegister.register)
router.route("/verifyCodeEmail").post(adminsRegister.verifyCode);

export default router;


