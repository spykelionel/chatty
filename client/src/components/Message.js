import React from "react";

function Message({ message }) {
  const current = localStorage.getItem("user");
  return (
    <div className={"content flex"}>
      <div
        className={
          "grid " +
          (message.sender == current
            ? "current sender"
            : " receiver")
        }
      >
        {message.sender == current ? (
          <></>
        ) : (
          <div className="flex">
            <span className="sender-name">{message.sender}</span>
          </div>
        )}
        <div className={"chat-message " + (message.sender == current
            ? "chat-message-sender button is-info"
            : "chat-message-receiver")}>
          <span>{message?.body?.text ?? ""}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
