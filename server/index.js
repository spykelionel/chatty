import socketIO, {Server} from "socket.io";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from 'http'

import dotenv from "dotenv";
dotenv.config();

import mongoConnect from "./config/mongo";
import Message from "./models/Message.js";

import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import roomRouter from './routes/room.routes.js'
import message from "./controllers/message.controller";
import room from "./controllers/room.controller";

const io = socketIO(process.env.SOCKET_PORT, {
  cors: {
    origin: "http://localhost:1234",
  },
});
const app = express();

const server = http.createServer(app)

// const socketio = new Server(server)

// global.io = socketio.listen(server)



io.on("connection", (socket) => {
  console.log("Connection established");

  getMostRecentMessages()
    .then((results) => {
      socket.emit("mostRecentMessages", [...results.reverse()]);
    })
    .catch((error) => {
      socket.emit("mostRecentMessages", []);
    });

  socket.on("newChatMessage", (data) => {
    //send event to every single connected socket
    console.log(data)
    try {
      const message = new Message(data);
      const roomId = data.room;
      // get the room and update.
      room.
      message
        .save()
        .then((res) => {
          console.log(res)
          io.emit("newChatMessage", res);
        })
        .catch((error) => console.log("error:", error));
    } catch (e) {
      console.log("error:", e);
    }
  });
  socket.on("disconnect", () => {
    console.log("connection disconnected");
  });
});

/**
 * get 10 last messages
 * @returns {Promise<Model[]>}
 */
async function getMostRecentMessages() {
  return await message.getAllMessages()
}

//sending json data
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true}));
app.use("/api/account", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/room", roomRouter);

app.use((req, res)=> {
  res.status(404).json({
    message: "Endpoint Not found",
    status_code: 404
  })
})

/**
 *
 * @returns {Promise<void>}
 */
const initApp = async () => {
  console.clear();
  try {
    await mongoConnect();
    console.log("DB connection established");
    server.listen(process.env.HTTP_PORT, () =>
      console.log(
        `HTTP Server listening on ${process.env.HTTP_PORT}`
      )
    );
  } catch (e) {
    throw e;
  }
};

initApp().catch((err) =>
  console.log(`Error on startup! ${err}`)
);
