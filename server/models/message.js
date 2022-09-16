import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    body: {
      text: {
        type: String,
        required: true,
      },
      attachment: {
        type: [String],
        default: "",
      }
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
