import React, { useEffect } from "react";

const MessageComponent = ({message}) => {

  useEffect(()=>{
    console.log(message);
  },[]);

  return (
    <div className="message-item">
      <div className="container-message-item-profile-picture">
        <img className="message-item-profile-picture" src="/logo512.png" />
      </div>
      <div className="container-message-item-data">
        <div className="container-message-item-name-date">
          <span className="message-item-sender-text">{message.messageSender.userEmail}</span>
          <span className="message-item-time-text">12:00 Am</span>
        </div>

        <span className="message-item-content">{message.messageContent}</span>
      </div>
    </div>
  );
};

export default MessageComponent;
