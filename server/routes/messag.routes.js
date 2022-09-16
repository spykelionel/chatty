import express from "express";
import message from "../controllers/message.controller.js";
const router = express.Router();

//handle http request for messagename and image for upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

router
  .get("/", message.getAllMessages)
  .post("/", message.createMessage)
  .get("/:id", message.getOneMessage)
  .delete("/:id", message.deleteOneMessage);

export default router;
