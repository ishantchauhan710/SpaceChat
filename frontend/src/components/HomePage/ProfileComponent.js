import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { createChatModalStyle } from "../../styles/modalStyles";

const ProfileComponent = ({ profileModal, handleProfileModalClose, user }) => {
  // useEffect(() => {
  //   console.log("Profile Modal User: ", user);
  // }, [profileModal]);

  return (
    <>
      {user && (
        <Modal open={profileModal} onClose={handleProfileModalClose}>
          <Box
            sx={createChatModalStyle}
            className="container-create-chat-modal modal"
          >
            <div className="container-profile-modal">
              <img
                className="profile-modal-profile-picture"
                src={user.userProfilePicture}
              />
              <span className="profile-modal-name-text">{user.userName}</span>
              <span className="profile-modal-email-text">{user.userEmail}</span>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ProfileComponent;
