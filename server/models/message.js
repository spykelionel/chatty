import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      user_name: {
        type: String,
        required: true,
      },
      user_avatar: String
    },
    message_text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
