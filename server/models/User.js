import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_avatar: String,
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
