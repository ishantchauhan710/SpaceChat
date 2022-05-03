import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfUserIsLoggedOut } from "../logic/AuthLogic/authorizationFunctions";
import { AppState } from "../AppContext";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { ChatComponent } from "../components/HomePage/ChatComponent";
import { CreateChatModalComponent } from "../components/HomePage/CreateChatModalComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import { getAuthorizedConfig } from "../constants/config";
import axios from "axios";
import {
  CREATE_CHAT_ENDPOINT,
  GET_CHATS_ENDPOINT,
  GET_MESSAGES_ENDPOINT,
  SEND_MESSAGE_ENDPOINT,
} from "../constants/endpoints";
import SendIcon from "@mui/icons-material/Send";
import MessageComponent from "../components/HomePage/MessageComponent";
import {
  createChatAsync,
  getChatsAsync,
} from "../logic/ChatLogic/chatFunctions";
import {
  getMessagesForChatAsync,
  sendMessageAsync,
} from "../logic/ChatLogic/messageFunctions";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  CircularProgress,
  createTheme,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import ProfileComponent from "../components/HomePage/ProfileComponent";

export const HomePage = () => {
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [messageContent, setMessageContent] = useState();
  const [messages, setMessages] = useState([]);
  const [chatUIClass, setChatUIClass] = useState("show");
  const [messageUIClass, setMessageUIClass] = useState("hide");
  const [profileModal, setProfileModal] = useState(false);
  const [profileModalUser, setProfileModalUser] = useState();
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  let hasEnterKeyPressed = false; // For preventing firefox browser from firing click events multiple times
  const { currentUser, setCurrentUser, showError } = AppState();
  const navigate = useNavigate();

  const setChat = (chat) => {
    setSelectedChat(chat);
    console.log("Selected Chat", chat);
  };

  const handleCreateChatModalTab = () => {
    setShowCreateChatModal(!showCreateChatModal);
  };

  const getChats = () => {
    getChatsAsync(currentUser, setChats, showError, setLoadingChats);
  };

  const createChat = (chatPersonId) => {
    createChatAsync(chatPersonId, currentUser, setChat, getChats, showError);
  };

  const getMessagesForChat = () => {
    getMessagesForChatAsync(
      currentUser,
      selectedChat,
      setMessages,
      showError,
      setLoadingMessages
    );
  };

  const sendMessage = async () => {
    await sendMessageAsync(
      messageContent,
      selectedChat,
      currentUser,
      setMessageContent,
      getMessagesForChat,
      showError
    );
  };

  const showChatPanel = () => {
    setChatUIClass("show");
    setMessageUIClass("hide");
  };

  const showMessagePanel = () => {
    setChatUIClass("hide");
    setMessageUIClass("show");
  };

  const logout = () => {
    handleClose();
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const showProfileModal = (currentUser) => {
    handleClose();
    setProfileModal(true);
    setProfileModalUser(currentUser);
  };

  const handleProfileModalClose = () => {
    setProfileModal(false);
  };

  /* Code for settings menu popup */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleSettingsMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    checkIfUserIsLoggedOut(navigate);
  }, []);

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("User Info: ", userInfo);
    setCurrentUser(userInfo);
  }, []);

  useEffect(() => {
    console.log("Current User ", currentUser);
    if (currentUser) {
      getChats();
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("Selected Chat", selectedChat);

    var inputField = document.getElementById("sendMessageInput");

    if (selectedChat) {
      getMessagesForChat();
      if (inputField) {
        inputField.addEventListener("keypress", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            hasEnterKeyPressed = true;
            if (hasEnterKeyPressed) {
              document.getElementById("buttonSendMessage").click();
              hasEnterKeyPressed = false;
            } else {
              return;
            }
          }
        });
      }
    }
  }, [selectedChat]);

  return (
    <div className="container-home-page">
      <div className={`container-chats ${chatUIClass}`}>
        <div className="container-home-label-control">
          <span className="home-text-h3">CHATS</span>
          <Fab
            style={{
              transform: "scale(0.65)",
              boxShadow: "0px 0px rgba(0,0,0,0)",
            }}
            color="homePrimaryVariant"
            aria-label="add"
            onClick={() => setShowCreateChatModal(true)}
          >
            <AddIcon style={{ transform: "scale(1.6)" }} />
          </Fab>
        </div>

        <div className="chats" style={{ position: "relative" }}>
          {chats &&
            chats.length > 0 &&
            chats.map((c) => (
              <ChatComponent
                key={c._id}
                chat={c}
                setChat={setChat}
                showMessagePanel={showMessagePanel}
                currentUser={currentUser}
              />
            ))}
          {loadingChats ? (
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                top: 0,
                left: "50%",
                marginRight: "20px",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 99999,
                position: "absolute",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <></>
          )}
        </div>

        <CreateChatModalComponent
          open={showCreateChatModal}
          handleClose={handleCreateChatModalTab}
          createChat={createChat}
        />
      </div>

      <div className={`container-messages ${messageUIClass}`}>
        <div className="message-app-bar">
          <div className="message-details">
            {selectedChat ? (
              <>
                <button className="back-button" onClick={() => showChatPanel()}>
                  <ArrowBackIcon style={{ color: "#fff" }} />
                </button>
                <img
                  className="message-profile-picture"
                  src={
                    currentUser._id === selectedChat.chatUsers[0]._id
                      ? selectedChat.chatUsers[1].userProfilePicture
                      : selectedChat.chatUsers[0].userProfilePicture
                  }
                />
                <div className="container-app-bar-message-details">
                  <span className="message-user-name">
                    {selectedChat &&
                      (selectedChat.isGroupChat
                        ? selectedChat.chatName
                        : currentUser._id === selectedChat.chatUsers[0]._id
                        ? selectedChat.chatUsers[1].userName
                        : selectedChat.chatUsers[0].userName)}
                  </span>
                  <span className="message-user-email">
                    {selectedChat &&
                      (selectedChat.isGroupChat
                        ? "Group Chat"
                        : currentUser._id === selectedChat.chatUsers[0]._id
                        ? selectedChat.chatUsers[1].userEmail
                        : selectedChat.chatUsers[0].userEmail)}
                  </span>
                </div>
              </>
            ) : (
              <span style={{ fontSize: "1.6rem", fontWeight: 500 }}>
                SpaceChat
              </span>
            )}
          </div>
          <div className="container-settings-icon">
            <Fab
              style={{
                transform: "scale(0.75)",
                boxShadow: "0px 0px rgba(0,0,0,0)",
              }}
              color="homePrimaryVariant"
              aria-label="add"
              onClick={handleSettingsMenuClick}
            >
              <SettingsIcon style={{ transform: "scale(1.4)" }} />
            </Fab>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => showProfileModal(currentUser)}>
                My Profile
              </MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </Menu>
            <ProfileComponent
              profileModal={profileModal}
              handleProfileModalClose={handleProfileModalClose}
              user={profileModalUser}
            />
          </div>
        </div>

        <div className="container-message-items" id="containerMessages">
          {loadingMessages ? (
            <div
              style={{
                width: "100%",
                position: "absolute",
                marginTop: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <></>
          )}
          {messages &&
            messages.map((message) => (
              <MessageComponent
                key={message._id}
                message={message}
                currentUser={currentUser}
                showProfileModal={showProfileModal}
              />
            ))}
        </div>

        {selectedChat && (
          <div className="container-input-send-message">
            <div className="send-message-input-wrapper">
              <input
                className="input-send-message"
                id="sendMessageInput"
                placeholder="Write a message..."
                onChange={(e) => setMessageContent(e.target.value)}
                value={messageContent}
              />
              <div className="container-message-controls">
                <button
                  id="buttonSendMessage"
                  className="button-send-message"
                  onClick={() => sendMessage()}
                >
                  <SendIcon
                    style={{ color: "#fff", transform: "scale(1.4)" }}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
