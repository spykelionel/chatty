import React from "react";
import MessageBox from "./MessageBox/MessageBox";
import Messages from "./Messages/Messages";
import useChat from "./useChat";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import Rooms from "./room/Rooms";
import useRoom from "./room/useRoom";
import Message from "./Messages/Message";

const Chat = () => {
  const navigate = useNavigate();
  const newRoomRef = React.useRef('');
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
  const storage = window.localStorage

  const createNewRoom = (e) => {
    e.preventDefault()
    const url = `http://localhost:5002/api/room`
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newRoomRef.current.value,
        description: "A new room",
      })
    })
    .then(res=>res.json())
    .then(room=>{
      newRoomRef.current.value = ''
      window.location.reload()
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className="place-items-center">
    <div id="container">
    <aside>
      <header>
        <form onSubmit={createNewRoom}>
          <input type="text" placeholder="create a new room" ref={newRoomRef} />
          <button type="submit">Create room</button>
        </form>
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
     <MessageBox
          onSendMessage={(message) => {
            sendMessage(message);
          }} />
        <div className="control self-center">
          <button style={{background: "red", color: "#fff", border: "none", outlineStyle: "none", padding: "5px", borderRadius: "3px", cursor: "pointer"}}
            className="button is-danger"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
    </main>
  </div>
    </div>
  );
};

export default Chat;
