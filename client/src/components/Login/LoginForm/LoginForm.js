import React, { useRef, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Loader from "react-loader-spinner";
import axios from "axios";

const LoginForm = ({ setUserDataForChat }) => {
  const [loading, setLoading] = useState(false);
  const userNameInput = useRef("");

  const enterChatClick = () => {
    setUserName(
      userNameInput.current.value
    );
  };

  const sendData = async (name) => {
    return await fetch(`http://localhost:5002/api/account/`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name })
    }
    );
  };

  const setUserName = async (userName) => {
    if (userName === "") {
      return false;
    }
      setLoading(true);
      try {
        await sendData(userNameInput.current.value)
          .then(res=>res.json())
          .then((response) => {
            console.log(response);
           if(response.status_code == 409){
            alert(response.message)
            return
           }
           localStorage.setItem('user', response.name)
           setUserDataForChat({
            name: response.name,
          });

          })
          .catch((error) => {
            alert(error);
            console.log(error);
          })
          .finally(() => setLoading(false));
      } catch (e) {
        throw new Error(e.toString());
        }
  };

  return loading ? (
    <Loader
      type="ThreeDots"
      color="#2BAD60"
      height={100}
      width={100}
    />
  ) : (
    <form className="login-form" autoComplete="off">
      <TextField
        id="chat-username"
        label="Enter Username"
        margin="normal"
        fullWidth
        minRows="1"
        inputRef={userNameInput}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            setUserName(
              event.target.value,
            );
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={enterChatClick}
      >
        Enter Chat
      </Button>
    </form>
  );
};

export default LoginForm;
