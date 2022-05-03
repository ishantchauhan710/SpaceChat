import React, { useEffect } from "react";
import { formatDate } from "../../util/DateUtil";
import { CreateChatModalComponent } from "./CreateChatModalComponent";

export const ChatComponent = ({
  chat,
  setChat,
  showMessagePanel,
  currentUser,
}) => {
  // useEffect(() => {
  //   //console.log("Chats: ",chat);
  //   // console.log("Chat Name: ",chat.chatItem.chatName);
  //   //console.log("ChatsItem Chat Users ID: ",chat.chatUsers[0]._id);
  //   //console.log("Current User ID", currentUser._id);
  //   // console.log("ChatsItem Chat Users First User Name: ",chat.chatItem.chatUsers[1].userName);
  // }, []);

  const performClickTasks = (chat) => {
    setChat(chat);
    showMessagePanel();
  };

  return (
    <div className="chat" onClick={() => performClickTasks(chat)}>
      <div className="online-status" />
      <img
        className="chat-user-profile-picture"
        src={
          currentUser._id === chat.chatUsers[0]._id
            ? chat.chatUsers[1].userProfilePicture
            : chat.chatUsers[0].userProfilePicture
        }
      />
      <div className="chat-data">
        <div className="chat-name-time-container">
          <span className="chat-username">
            {currentUser._id === chat.chatUsers[0]._id
              ? chat.chatUsers[1].userName
              : chat.chatUsers[0].userName}
          </span>
          <span className="chat-date-time">{chat.lastMessage?formatDate(chat.lastMessage.updatedAt):"Null"}</span>
        </div>
        <span className="chat-last-message">{chat.lastMessage?chat.lastMessage.messageContent:"Null"}</span>
      </div>
      <CreateChatModalComponent />
    </div>
  );
};
