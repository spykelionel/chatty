import React from "react";
import MessageBox from "./MessageBox/MessageBox";
import Messages from "./Messages/Messages";
import useChat from "./useChat";
import {useNavigate} from 'react-router-dom'

const Chat = (currentUserData) => {
  const navigate = useNavigate()
  const {messages, sendMessage} = useChat();
  const user = localStorage.getItem('user')
  if(!user){
    navigate('/login')
  }
  return (
    <div>
      <Messages
        messages={messages}
      />
      <MessageBox
        userData={currentUserData}
        onSendMessage={message => {
          sendMessage(message);
        }}
      />
      <button onClick={()=>{localStorage.removeItem("token");navigate('/login')}}>Logout</button>
    </div>
  );
};

export default Chat;