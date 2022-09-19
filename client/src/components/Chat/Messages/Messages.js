import React from "react";
import { useParams } from "react-router-dom";
import Message from "../../Message";

const Messages = ({ messages }) => {
  const gotoLastMessageRef = React.useRef(null);
  React.useEffect(() => {
    gotoLastMessageRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="p-max message-items">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
      <div ref={gotoLastMessageRef}></div>
    </div>
  );
};

export default Messages;
