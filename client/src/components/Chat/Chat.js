import React from "react";
import MessageBox from "./MessageBox/MessageBox";
import Messages from "./Messages/Messages";
import useChat from "./useChat";
import { useNavigate } from "react-router-dom";

const Chat = (currentUserData) => {
  const navigate = useNavigate();
  const { messages, sendMessage } = useChat();
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/login");
  }
  return (
    <div className="flex chat">
      <div className="bg-green">{"chatty"}</div>
      <div className="messages">
        <div className="p-2 has-background-light">
          <h1 className="title has-text-centered has-text-success">
            Chatty
          </h1>
          <h2 className="subtitle has-text-centered">
            Public Room
          </h2>
        </div>
        <Messages messages={messages} />
        <MessageBox
          userData={currentUserData}
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
