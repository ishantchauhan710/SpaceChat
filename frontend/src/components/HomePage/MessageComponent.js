import React from "react";

const MessageComponent = () => {
  return (
    <div className="message-item">
      <div className="container-message-item-profile-picture">
        <img className="message-item-profile-picture" src="/logo512.png" />
      </div>
      <div className="container-message-item-data">
        <div className="container-message-item-name-date">
          <span className="message-item-sender-text">Ishant Chauhan</span>
          <span className="message-item-time-text">12:00 Am</span>
        </div>

        <span className="message-item-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
      </div>
    </div>
  );
};

export default MessageComponent;
