import React, { useState } from "react";
import Chat from "/components/Chat/Chat";
import LoginForm from "./components/Login/LoginForm";
import { Routes, Route } from "react-router-dom";
import Rooms from './components/Chat/room/Rooms'

import "./App.css";
import Signup from "./components/Signup";

const App = () => {
  const [userData, setUserData] = useState(
    localStorage.getItem("user") ?? null
  );

  if (true) {
    return (
      <div className="container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              <LoginForm setUserDataForChat={setUserData} />
            }
          />
          <Route path="/room/:roomId" element={<Chat />}>
            {/* <Route path=":roomId" element={<>You are here</>} /> */}
          </Route>
        </Routes>
      </div>
    );
  }
  return <Chat currentUserData={userData} />;
};

export default App;
