import express from "express";
import room from "../controllers/room.controller.js";
const router = express.Router();

router
  .get("/", room.getAllRooms)
  .post("/", room.createRoom)
  .get("/:id", room.getOneRoom)
  .delete("/:id", room.deleteOneRoom);

export default router;
