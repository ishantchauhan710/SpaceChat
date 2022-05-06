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
  BASE_URL,
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
import io from "socket.io-client";
import { EditGroupChatModalComponent } from "../components/HomePage/EditGroupChatModalComponent";

export const HomePage = () => {
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [showEditGroupChatModal, setShowEditGroupChatModal] = useState(false);

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
  const [updateChat, setUpdateChat] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  let compareSelectedChat;
  let hasEnterKeyPressed = false; // For preventing firefox browser from firing click events multiple times
  const { currentUser, setCurrentUser, showError } = AppState();
  const navigate = useNavigate();

  /* Code for socket.io */
  useEffect(() => {
    setSocket(io(BASE_URL));
  }, []);


  useEffect(() => {
    if (!socket) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("userInfo"));

    console.log("IO: ", socket);
    console.log("Socket Current User ", user);

    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
      console.log("Socket Connection Established");
    });

  

    socket.on("typing", () => {
      setIsTyping(true);
      console.log("SOCKET TYPING STARTED, STATE: ", isTyping);
    });
    socket.on("stopTyping", () => {
      setIsTyping(false);
      console.log("SOCKET TYPING STOPPED, STATE: ", isTyping);
    });

    console.log("IO Again: ", socket);
  }, [socket]);

  const setChat = (chat) => {
    setSelectedChat(chat);
    console.log("Selected Chat", chat);
  };

  const handleCreateChatModalTab = () => {
    setShowCreateChatModal(!showCreateChatModal);
  };

  const handleEditGroupChatModalComponent = () => {
    setShowEditGroupChatModal(!showEditGroupChatModal);
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

    socket.emit("joinRoom", selectedChat._id);
  };

  const editChat = () => {
    if(selectedChat && selectedChat.isGroupChat) {
      handleEditGroupChatModalComponent();
    }
  };

  const sendMessage = async () => {
    if (!socket) {
      console.log("Send Message Socket Not Found ", socket);
      return;
    }

    await sendMessageAsync(
      socket,
      messageContent,
      selectedChat,
      currentUser,
      setMessageContent,
      getMessagesForChat,
      messages,
      setMessages,
      showError
    );
  };

  const showChatPanel = () => {
    setChatUIClass("show");
    setMessageUIClass("hide");
    setSelectedChat();
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

  const handleTypingState = (messageInputTextValue) => {
    setMessageContent(messageInputTextValue);

    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
      console.log("TYPING STARTED");
      console.log("IS TYPING IS: ", isTyping);
    }

    let typingTimeStarted = new Date().getTime();
    let awaitDuration = 1000;
    setTimeout(() => {
      let typingTimeNow = new Date().getTime();
      let timeDifference = typingTimeNow - typingTimeStarted;
      console.log("TIME DIFFERENCE STARTED: ", timeDifference);
      if (timeDifference >= awaitDuration && typing) {
        setTyping(false);
        console.log("TIME DIFFERENCE OVER: ", timeDifference);
        socket.emit("stopTyping", selectedChat._id);
        console.log("TYPING STOPPED");
        console.log("IS TYPING IS: ", isTyping);
      }
    }, awaitDuration);
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
    if (!socket) {
      return;
    }

    console.log("Looking for messages");

    socket.on("messageReceived", (newMessageReceived) => {
      console.log("Message is here");

      console.log("Message received details: ", newMessageReceived);

      if (
        !compareSelectedChat ||
        compareSelectedChat._id === newMessageReceived.messageChat._id
      ) {
        setMessages([...messages, newMessageReceived]);
      }
    });

    //return () => socket.emit('end');
  });

  useEffect(() => {
    // console.log("Current User ", currentUser);
    if (currentUser) {
      getChats();
      setUpdateChat(false);
    }
  }, [currentUser, updateChat]);

  useEffect(() => {
    //console.log("Selected Chat", selectedChat);

    if (!socket) {
      return;
    }

    var inputField = document.getElementById("sendMessageInput");

    if (selectedChat) {
      getMessagesForChat();
      compareSelectedChat = selectedChat;
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
                selectedChat={selectedChat}
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
          setUpdateChat={setUpdateChat}
          setChat={setChat}
        />

        {selectedChat && (
          <EditGroupChatModalComponent
            open={showEditGroupChatModal}
            handleClose={handleEditGroupChatModalComponent}
            createChat={createChat}
            setUpdateChat={setUpdateChat}
            setChat={setChat}
            selectedChat={selectedChat}
          />
        )}
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
                <div
                  className="container-app-bar-message-details"
                  onClick={() => editChat()}
                >
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
                        ? `${selectedChat.chatUsers.length} Members`
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
              currentUser={currentUser}
              createChat={createChat}
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
          {!typing && isTyping ? (
            <div className="typing-indicator">User is typing.....</div>
          ) : (
            <></>
          )}
        </div>
        {selectedChat && (
          <div className="container-input-send-message">
            {/* {!typing && isTyping ? "Typing..." : <></>} */}
            <div className="send-message-input-wrapper">
              <input
                className="input-send-message"
                id="sendMessageInput"
                placeholder="Write a message..."
                autoComplete="off"
                onChange={(e) => handleTypingState(e.target.value)}
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