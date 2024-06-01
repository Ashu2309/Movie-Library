import express from "express";
import * as userController from "../controllers/userController.js"
import { Auth } from "../middleware/Auth.js";
const router = express.Router()

router.route("/").post(userController.signup)
router.route("/login").post(userController.login)

export default router;