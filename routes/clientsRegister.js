import express from "express";
import clientsRegister from "../controllers/clientsRegister.js";

const router = express.Router();

router.route("/").post(clientsRegister.register)
router.route("/verifyCodeEmail").post(clientsRegister.verifyCode);

export default router;


