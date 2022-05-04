import { Box, Button, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { createChatModalStyle } from "../../styles/modalStyles";

const ProfileComponent = ({ profileModal, handleProfileModalClose, user, currentUser, createChat }) => {
  // useEffect(() => {
  //   console.log("Profile Modal User: ", user);
  // }, [profileModal]);

  const handleOnClick = () => {
    createChat(user._id)
    handleProfileModalClose();
  }

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
              {currentUser._id!==user._id && (
                <Button onClick={() => handleOnClick()} variant="outlined" style={{color: "#fff", border: "1px solid #fff", marginTop: 20, width: "50%"}}>Message</Button>
              )}
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ProfileComponent;
