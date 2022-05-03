import React, { useEffect } from "react";
import { formatDate } from "../../util/DateUtil";

const MessageComponent = ({ message }) => {
  useEffect(() => {
    console.log(message);
  }, []);

  return (
    <div className="message-item">
      <div className="container-message-item-profile-picture">
        <img className="message-item-profile-picture" src={message.messageSender.userProfilePicture} />
      </div>
      <div className="container-message-item-data">
        <div className="container-message-item-name-date">
          <span className="message-item-sender-text">
            {message.messageSender.userName}
          </span>
          <span className="message-item-time-text">{formatDate(message.updatedAt)}</span>
        </div>

        <span className="message-item-content">{message.messageContent}</span>
      </div>
    </div>
  );
};

export default MessageComponent;
