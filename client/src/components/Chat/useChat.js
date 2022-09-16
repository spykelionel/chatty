import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const useChat = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const gotoLastMessageRef = useRef(null);

  useEffect(() => {
    const url = "http://localhost:5002/api/message";

    const fetchMessages = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setMessages((prv) => [...prv, ...data]);
      } catch (error) {
        console.log("error", error);
      }
    };

    socketRef.current = io("http://localhost:5001");

    // socketRef.current.on(
    //   "mostRecentMessages",
    //   (mostRecentMessages) => {
    //     // setMessages([...mostRecentMessages]);
    //   }
    // );

    socketRef.current.on("newChatMessage", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });
    fetchMessages(url);
    console.log("MSGS::::", messages);
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    // gotoLastMessageRef.current.scrollIntoView({ behavior: "auto" });
}, []);
  const sendMessage = (message) => {
    socketRef.current.emit("newChatMessage", message);
  };

  return { messages, sendMessage };
};

export default useChat;
