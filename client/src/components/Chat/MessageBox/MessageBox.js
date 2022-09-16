import React,{useState, useRef} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//renaming prop for use in the component
const MessageBox = (props) => {
  const [initialMessage] = useState({
    sender: '',
    avatar: '',
    body: {
      text: '',
      attachment: ''
    }
  })
  const [message, setMessage] = useState(initialMessage);
  const messageRef = useRef("");

  const sendMessageClick = () =>{
    if(messageRef.current.value === ""){
      return false;
    }
    props.onSendMessage(message);
    setMessage(initialMessage);
  }
  const handleMessageChange = (e) => {
    setMessage({
      sender: localStorage.getItem('user')??'anonymous',
      avatar: '',
      body: {
        text: messageRef.current.value,
        attachment: ''
      }
    })
  }

  return (
    <form className="chat-form" autoComplete="off">
      <TextField
        id="standard-basic"
        label="Write your message here"
        margin="normal"
        multiline
        fullWidth
        minRows="4"
        inputRef={messageRef}
        onChange={handleMessageChange}
        onKeyDown={event => {
          if(event.key === "Enter"){
            //prevents enter from being pressed
            event.preventDefault();
            sendMessageClick();
          }
        }}
        value={message.body.text}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={sendMessageClick}
      >
        Send
      </Button>
    </form>
  );
};

export default MessageBox;