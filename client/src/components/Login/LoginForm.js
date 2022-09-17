import React, { useRef, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Loader from "react-loader-spinner";
import {Link, useNavigate} from "react-router-dom";

const LoginForm = ({ setUserDataForChat }) => {
  const [loading, setLoading] = useState(false);
  const userNameInput = useRef("");
  const passwordInputRef = useRef("")
  const navigate = useNavigate()
  const storage = window.localStorage
  async function authenticateUser(url, data) {
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res=>res.json())
      .then(data=>{
        const user = {
          token: data.token,
          user: data.user
        }
        console.log(user)
        storage.setItem('user', user.user.name)
        storage.setItem('token', user.token)
        navigate('/')
      })
      .catch(err=>console.log(err))
  }
  const login = (e) => {
    const url = 'http://localhost:5002/api/account/login'
    e.preventDefault()
    const data = {
      name: userNameInput.current.value,
      password: passwordInputRef.current.value
    }
    authenticateUser(url, data)
  }

  return loading ? (
    <Loader
      type="ThreeDots"
      color="#2BAD60"
      height={100}
      width={100}
    />
  ) : (
    <div>
      <form className="login-form" onSubmit={login} autoComplete="off">
      <TextField
        id="chat-username"
        label="Enter Username"
        margin="normal"
        fullWidth
        minRows="1"
        type="text"
        inputRef={userNameInput}
      />
      <TextField
        id="chat-password"
        label="Enter Password"
        margin="normal"
        fullWidth
        minRows="1"
        type="password"
        inputRef={passwordInputRef}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Enter Chat
      </Button>
      <div>
        <p>
          <Link to="/login">Signup</Link>
        </p>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
