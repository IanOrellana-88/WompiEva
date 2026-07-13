import express from "express";
import adminsLogin from "../controllers/adminsLogin";

const router = express.Router();

router.route("/").post(adminsLogin.login);

export default router;