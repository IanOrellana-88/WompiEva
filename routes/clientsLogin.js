import express from "express";
import clientsLogin from "../controllers/clientsLogin.js";

const router = express.Router();

router.route("/").post(clientsLogin.login);

export default router;