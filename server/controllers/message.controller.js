import Message from "../models/Message.js";
import User from "../models/User.js";


async function getAllMessages(req, res) {
  try {
    await Message.find({})
      .lean()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  } catch (error) {
    return res
      .send(501)
      .json({ message: "Server is Down" });
  }
}

async function getOneMessage(req, res) {
  try {
    await Message.findOne({ _id: req.params.id })
      .lean()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  } catch (error) {
    return res
      .send(501)
      .json({ message: "Server is Down" });
  }
}

async function createMessage(req, res) {
  try {
    console.log("Init create Message");

    User.findOne({ name: req.body.sender.name })
      .then(async (result) => {
        return res.status(200).json({result})
      })
      .catch((err) => console.error(err));
  } catch (error) {
    return res
      .send(501)
      .json({ message: "Server is Down" });
  }
}

async function deleteOneMessage(req, res) {
  try {
    await Message.deleteOne({ _id: req.params.id })
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  } catch (error) {
    return res
      .send(501)
      .json({ message: "Server is Down" });
  }
}



const message = {
  getAllMessages,
  getOneMessage,
  createMessage,
  deleteOneMessage,
};

export default message;
