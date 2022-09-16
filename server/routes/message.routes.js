import express from "express";
import message from "../controllers/message.controller.js";
const router = express.Router();

router
  .get("/", message.getAllMessages)
  .post("/", message.createMessage)
  .get("/:id", message.getOneMessage)
  .delete("/:id", message.deleteOneMessage);

export default router;
