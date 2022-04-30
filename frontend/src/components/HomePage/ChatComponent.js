import React from "react";

export const ChatComponent = () => {
  return (
    <div className="chat">
      <div className="online-status" />
      <img
        className="chat-user-profile-picture"
        src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
      />
      <div className="chat-data">
        <div className="chat-name-time-container">
          <span className="chat-username">Ishant Chauhan</span>
          <span className="chat-date-time">27 Jan 2022</span>
        </div>
        <span className="chat-last-message">
          Lorem ipsum lorem ipsum lorem ipsum
        </span>
      </div>
    </div>
  );
};
