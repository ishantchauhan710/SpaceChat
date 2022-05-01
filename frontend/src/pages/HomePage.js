import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfUserIsLoggedOut } from "../logic/AuthLogic/authorizationFunctions";

import { AppState } from "../AppContext";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { ChatComponent } from "../components/HomePage/ChatComponent";
import { CreateChatModalComponent } from "../components/HomePage/CreateChatModalComponent";
import SettingsIcon from "@mui/icons-material/Settings";

export const HomePage = () => {
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState();

  const { currentUser, setCurrentUser } = AppState();

  const navigate = useNavigate();

  const chatCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    checkIfUserIsLoggedOut(navigate);
    setCurrentUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log("Current User: ", currentUser);
  }, []);

  const handleCreateChatModalTab = (tabNumber) => {
    setShowCreateChatModal(!showCreateChatModal);
  };

  return (
    <div className="container-home-page">
      <div className="container-chats">
        <input className="input-search-chat" placeholder="Search" />
        <div className="container-home-label-control">
          <span className="home-text-h3">CHATS</span>
          <Fab
            style={{ transform: "scale(0.475)" }}
            color="homePrimaryVariant"
            aria-label="add"
            onClick={() => setShowCreateChatModal(true)}
          >
            <AddIcon style={{ transform: "scale(1.4)" }} />
          </Fab>
        </div>

        <div className="chats">
          {chatCount.map((c) => (
            <ChatComponent />
          ))}
        </div>

        <CreateChatModalComponent
          open={showCreateChatModal}
          handleClose={handleCreateChatModalTab}
        />
      </div>

      <div className="container-messages">
        <div className="message-app-bar">
          <div className="message-details">
            <img
              className="message-profile-picture"
              src={currentUser.userProfilePicture}
            />
            <span className="message-user-name">{currentUser.userName}</span>
          </div>
          <div className="container-settings-icon">
            <Fab
              style={{ transform: "scale(0.75)" }}
              color="homePrimaryVariant"
              aria-label="add"
            >
              <SettingsIcon style={{ transform: "scale(1.4)" }} />
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
};
