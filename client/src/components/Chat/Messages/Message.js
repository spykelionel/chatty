import React from "react";

function Message({ message }) {
  const current = localStorage.getItem("user");
  let date = new Date(message.createdAt);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return (
    <>
      <div
        className={message.sender == current ? "me" : "you"}
      >
        <div className="entete">
          <span
            className={
              "status " + message.sender == current
                ? "blue"
                : "green"
            }
          ></span>
          <h2>{message.sender}</h2>
          <h3>{` ${year}-${month}-${dt} `}</h3>
        </div>
        <div className="triangle"></div>
        <div className="message">
          {message?.body?.text ?? ""}
        </div>
      </div>
    </>
  );
}

export default Message;
