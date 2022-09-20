import React, { useRef, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import useRoom from "../Chat/room/useRoom";

const LoginForm = ({ setUserDataForChat }) => {
  const [loading, setLoading] = useState(false);
  const { rooms } = useRoom()
  const userNameInputRef = useRef("");
  const passwordInputRef = useRef("");
  const navigate = useNavigate();
  const storage = window.localStorage;
  async function authenticateUser(url, data) {
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.token){
          const user = {
            token: data.token,
            user: data.user,
          };
          console.log(user);
          storage.setItem("user", user.user.name);
          storage.setItem("token", user.token);
          navigate(`/room/${rooms[0]._id}`);
        } else {
          alert("Incorrect credentials")
        }
      })
      .catch((err) => console.log(err));
  }
  const login = (e) => {
    const url = "http://localhost:5002/api/account/login";
    e.preventDefault();
    const data = {
      name: userNameInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    authenticateUser(url, data);
  };

  return loading ? (
    <Loader
      type="ThreeDots"
      color="#2BAD60"
      height={100}
      width={100}
    />
  ) : (
    <div>
      <div className="place-items-center w-40">
        <div className="container content is-center">
          <div className="p-6 has-background-light">
            <h1 className="title has-text-centered has-text-success">
              Chatty
            </h1>
            <h2 className="subtitle has-text-centered">
              Login Form
            </h2>
            <form onSubmit={login}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    className="input"
                    ref={userNameInputRef}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    ref={passwordInputRef}
                    placeholder="Enter password"
                    className="input"
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-success"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <div className="control self-center">
                  <Link to={"/signup"}>Register</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
