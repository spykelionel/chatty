import React from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  const gotoLastMessageRef = React.useRef(null);
  React.useEffect(() => {
    gotoLastMessageRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="p-max message-items chat">
      {messages.map((message, _index) => (
        <Message message={message} key={message._id} />
      ))}
      <div ref={gotoLastMessageRef}></div>
    </div>
  );
};

export default Messages;
