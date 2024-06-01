import express from "express";
import * as movieController from "../controllers/movieController.js"
import { Auth } from "../middleware/Auth.js";
const router = express.Router()

router.route("/:playlistId").post(Auth, movieController.addMovie).delete(Auth, movieController.removeMovie)

export default router;