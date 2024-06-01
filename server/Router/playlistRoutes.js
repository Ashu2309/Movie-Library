import express from "express";
import * as playlistController from "../controllers/playlistController.js"
import { Auth } from "../middleware/Auth.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const router = express.Router()

router.route("/").post(Auth, playlistController.createPlaylist)
router.route("/:playlistId").delete(Auth, playlistController.deletePlaylist).put(Auth, playlistController.updatePlaylist)
router.route("/:username").get(isLoggedIn, playlistController.getPlaylist)

export default router;