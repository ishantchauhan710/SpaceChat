import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfUserIsLoggedOut } from "../logic/authorizationFunctions";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { ChatComponent } from "../components/HomePage/ChatComponent";
import { CreateChatModalComponent } from "../components/HomePage/CreateChatModalComponent";

export const HomePage = () => {
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);

  const handleCreateChatModalTab = (tabNumber) => {
    setShowCreateChatModal(!showCreateChatModal);
  };

  const chatCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
            <AddIcon
              style={{ transform: "scale(1.4)" }}
            />
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

      <div className="container-messages">Messages</div>
    </div>
  );
};
