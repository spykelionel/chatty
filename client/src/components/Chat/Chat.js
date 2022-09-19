import React from "react";
import MessageBox from "./MessageBox/MessageBox";
import Messages from "./Messages/Messages";
import useChat from "./useChat";
import { useNavigate, useParams } from "react-router-dom";
import Rooms from "./room/Rooms";
import useRoom from "./room/useRoom";
import SidebarChat from "./SidebarChat";
import Message from "../Message";
import { Avatar } from "@material-ui/core";
import { Send } from "@material-ui/icons";

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
    <div className="place-items-center">
    <div id="container">
    <aside>
      <header>
        <input type="text" placeholder="search" />
      </header>
    <Rooms />
    </aside>
    <main>
      <header>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
          alt=""
        />
        <div>
          <h2>{room.name}</h2>
          <h3>{messages.length>1? `${messages.length} messages`: `${messages.length} message`}</h3>
        </div>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
          alt=""
        />
      </header>
      <ul id="chat">
        {
          messages.map((message, idx)=> <Message message={message} key={message._id} />)
        }
      </ul>
      <footer>
        <textarea placeholder="Type your message"></textarea>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png"
          alt=""
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png"
          alt=""
        />
        <Send />
      </footer>
    </main>
  </div>
    </div>
  );
};

export default Chat;
