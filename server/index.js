import socketIO from "socket.io";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

import mongoConnect from "./config/mongo";
import Message from "./models/Message.js";

import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import roomRouter from './routes/room.routes.js'

const io = socketIO(process.env.SOCKET_PORT, {
  cors: {
    origin: "http://localhost:1234",
  },
});
const app = express();

io.on("connection", (socket) => {
  console.log("Connection established");

  getMostRecentMessages()
    .then((results) => {
      socket.emit("mostRecentMessages", results.reverse());
    })
    .catch((error) => {
      socket.emit("mostRecentMessages", []);
    });

  socket.on("newChatMessage", (data) => {
    //send event to every single connected socket
    const msgData = {
      sender: {
        user_name: data.user_name,
        user_avatar: data.user_avatar,
      },
      message_text: data.message,
    };
    try {
      const message = new Message(msgData);
      message
        .save()
        .then(() => {
          io.emit("newChatMessage", msgData);
        })
        .catch((error) => console.log("error: " + error));
    } catch (e) {
      console.log("error: " + e);
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
  return await Message.find().sort({ _id: -1 }).limit(10);
}

//sending json data
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
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
    app.listen(process.env.HTTP_PORT, () =>
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
