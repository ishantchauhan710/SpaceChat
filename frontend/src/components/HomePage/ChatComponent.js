import React, { useEffect } from "react";
import { CreateChatModalComponent } from "./CreateChatModalComponent";

export const ChatComponent = ({chat,setChat}) => {

  useEffect(() => {
    // console.log("Chats: ",chat);
    // console.log("Chat Name: ",chat.chatItem.chatName);
    // console.log("ChatsItem Chat Users: ",chat.chatItem.chatUsers);
    // console.log("ChatsItem Chat Users First User Name: ",chat.chatItem.chatUsers[1].sc_userName);
  
  },[])


  return (
    <div className="chat" onClick={() => setChat(chat)}>
      <div className="online-status" />
      <img
        className="chat-user-profile-picture"
        src={chat.chatUsers[1].sc_userProfilePicture}
      />
      <div className="chat-data">
        <div className="chat-name-time-container">
          <span className="chat-username">
          {chat.isGroupChat?chat.chatName:chat.chatUsers[1].sc_userName}
          </span>
          <span className="chat-date-time">27 Jan 2022</span>
        </div>
        <span className="chat-last-message">
        Start a Conversation Now!
        </span>
      </div>
      <CreateChatModalComponent />
    </div>
  );
};
