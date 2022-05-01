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
import { GET_CHATS_ENDPOINT } from "../constants/endpoints";

export const HomePage = () => {
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [chats, setChats] = useState([]);

  const [selectedChat, setSelectedChat] = useState();
  const [chatLoading, setChatLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateChatModalTab = (tabNumber) => {
    setShowCreateChatModal(!showCreateChatModal);
  };

  // useEffect(() => {
  //   checkIfUserIsLoggedOut(navigate);
  // }, []);

  const getChats = async () => {
    if (!currentUser) {
      return;
    }

    try {
      setChatLoading(true);

      const config = getAuthorizedConfig(currentUser.token);
      const { data } = await axios.get(GET_CHATS_ENDPOINT, config);
      console.log(data);
      setChats(data);
      setChatLoading(false);
    } catch (e) {
      showError(e.message);
      setChatLoading(false);
    }
  };

  const { currentUser, setCurrentUser, showError } = AppState();

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("User Info: ", userInfo);
    setCurrentUser(userInfo);
  }, []);

  useEffect(() => {
    console.log("Current User ", currentUser);
    getChats();
  }, [currentUser]);

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
          {chats &&
            chats.length > 0 &&
            chats.map((c) => <ChatComponent key={c._id} chatItem={c} />)}
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
              src={currentUser && currentUser.userProfilePicture}
            />
            <span className="message-user-name">
              {currentUser && currentUser.userName}
            </span>
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
