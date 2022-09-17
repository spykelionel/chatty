import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Send } from "@material-ui/icons";

//renaming prop for use in the component
const MessageBox = (props) => {
  const [initialMessage] = useState({
    sender: "",
    avatar: "",
    body: {
      text: "",
      attachment: "",
    },
  });
  const [message, setMessage] = useState(initialMessage);
  const messageRef = useRef("");

  const sendMessageClick = (e) => {
    e.preventDefault();
    if (messageRef.current.value === "") {
      return false;
    }
    if (e.key === "Enter") {
      props.onSendMessage(message);
      setMessage(initialMessage);
      return
    }
  
    props.onSendMessage(message);
    setMessage(initialMessage);
  }
;
  const handleMessageChange = (e) => {
    setMessage({
      sender: localStorage.getItem("user") ?? "anonymous",
      avatar: "",
      body: {
        text: messageRef.current.value,
        attachment: "",
      },
    });
  };

  return (
    <form className="chat-form" onSubmit={sendMessageClick} autoComplete="off">
      <div className="flex msg-box">
        <TextField
          id="standard-basic"
          label="Write your message here"
          margin="normal"
          multiline
          fullWidth
          minRows="1"
          inputRef={messageRef}
          onChange={handleMessageChange}
          value={message.body.text}
          onKeyDown={(e)=>{
            if (e.key === "Enter") {
              props.onSendMessage(message);
              setMessage(initialMessage);
              return
            }
          }
        }
        />

        <div className="control send-btn">
          <button
            className="button is-success"
            type="submit"
          >
            <Send />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageBox;
