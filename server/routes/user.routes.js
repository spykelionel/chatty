import multer from "multer";
import express from "express";
import user from "../controllers/user.controller.js";
import uploadImage from "../controllers/fileUploader.js";
const router = express.Router();

//handle http request for username and image for upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

router
  .get("/", user.getAllUsers)
  .post("/", user.createUser)
  .post('/avatar', user.uploadAvatar, uploadImage)
  .get("/:id", user.getOneUser)
  .delete("/:id", user.deleteOneUser);
// app.post(
//   "/api/upload",
//   upload.single("avatar"),
//   fileUploader
// );
export default router;
