import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const registerUser = (e) => {
    const url = "http://localhost:5002/api/account";
    const data = {
      name,
      password,
    };
    console.log(data);
    e.preventDefault();
    const register = (url, data) => {
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    };
    if (password === password2) {
      register(url, data);
      return;
    } else {
      alert("Passwords do not match");
      return;
    }
  };

  return (
    <div className="place-items-center">
        <div className="container content is-center">
      <div className="p-6 has-background-light">
        <h1 className="title has-text-centered has-text-success">
          Chatty
        </h1>
        <h2 className="subtitle has-text-centered">
          Sign Up Form
        </h2>
        <form onSubmit={registerUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                name="name"
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter name"
                className="input"
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
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                className="input"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              Comfirm password
            </label>
            <div className="control">
              <input
                name="password"
                type="password"
                id="password"
                value={password2}
                onChange={handlePasswordChange2}
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
                Sign up
              </button>
            </div>
            <div className="control self-center">
              <Link to={"/login"} >Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Signup;
