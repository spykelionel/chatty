import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const useChat = (id) => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const storage = window.localStorage

  useEffect(() => {
    const url = `http://localhost:5002/api/message/${id}`;

    const fetchMessages = async (url) => {
      const token = storage.getItem('token')
      try {
        const response = await fetch(url, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    socketRef.current = io("http://localhost:5001");

    socketRef.current.on("newChatMessage", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });
    fetchMessages(url);
    console.log("MSGS::::", messages);
    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);
  const sendMessage = (message) => {
    socketRef.current.emit("newChatMessage", {...message, room: id});
  };

  return { messages, sendMessage };
};

export default useChat;
