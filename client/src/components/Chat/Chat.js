import React from "react";
import MessageBox from "./MessageBox/MessageBox";
import Messages from "./Messages/Messages";
import useChat from "./useChat";
import { useNavigate, useParams } from "react-router-dom";
import Rooms from "./room/Rooms";
import useRoom from "./room/useRoom";

const Chat = () => {
  const navigate = useNavigate();
  // const _roomId = "6324234f7faf62cb8026bdfb"
  const { roomId } = useParams()
  console.log("Room ID:", roomId)
  const {room} = useRoom(roomId)
  const { messages, sendMessage } = useChat(roomId);
  const user = localStorage.getItem("user");
  if (!user) {
    React.useEffect(()=>{
      navigate("/login");
    },[])
  }
  return (
    <div className="flex chat">
      <div className="bg-green">
      <Rooms />
      </div>
      <div className="messages">
        <div className="p-2 has-background-light">
          <h1 className="title has-text-centered has-text-success">
            Chatty
          </h1>
          <h2 className="subtitle has-text-centered">
            {room.name??"Public"}
          </h2>
        </div>
        <Messages messages={messages} />
        <MessageBox
          onSendMessage={(message) => {
            sendMessage(message);
          }}
        />
        <div className="control self-center">
          <button
            className="button is-danger"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
