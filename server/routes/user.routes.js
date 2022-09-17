import express from "express";
import user from "../controllers/user.controller.js";
import uploadImage from "../controllers/fileUploader.js";
import auth from "../auth/verify";
import login from "../auth/auth.js";
const router = express.Router();

router
  .post("/login", login)
  .post("/", user.createUser)
  .post("/avatar", user.uploadAvatar, uploadImage)
  .get("/", auth, user.getAllUsers)
  .get("/:id", auth, user.getOneUser)
  .delete("/:id", auth, user.deleteOneUser);

export default router;
