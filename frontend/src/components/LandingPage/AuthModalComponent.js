import { Box, Button, Modal, Tab, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AppState } from "../../AppContext";

import { useNavigate } from "react-router-dom";
import { loginUserAccount } from "../../logic/AuthLogic/loginFunctions";

import {
  configureProfilePicture,
  signupUserAccount,
} from "../../logic/AuthLogic/signupFunctions.js";
import { authModalStyle } from "../../styles/modalStyles";

const AuthModalComponent = ({ open, handleClose, tabNum, setTabNum }) => {
  const { setLoading, showSuccess, showError } = AppState();

  const navigate = useNavigate();

  const [registerUserName, setRegisterUserName] = useState();
  const [registerUserEmail, setRegisterUserEmail] = useState();
  const [registerUserPassword, setRegisterUserPassword] = useState();
  const [registerUserConfirmPassword, setRegisterUserConfirmPassword] =
    useState();
  const [registerUserProfilePicture, setRegisterUserProfilePicture] =
    useState();

  const [loginUserEmail, setLoginUserEmail] = useState();
  const [loginUserPassword, setLoginUserPassword] = useState();

  const signupUser = () => {
    signupUserAccount(
      setLoading,
      showError,
      registerUserName,
      registerUserEmail,
      registerUserPassword,
      registerUserConfirmPassword,
      showSuccess,
      registerUserProfilePicture,
      navigate
    );
  };

  const loginUser = () => {
    loginUserAccount(
      setLoading,
      showError,
      loginUserEmail,
      loginUserPassword,
      showSuccess,
      navigate
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={authModalStyle} className="container-auth-modal">
        <TabContext value={tabNum.toString()}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(event, tabValue) => setTabNum(tabValue)}
              variant="fullWidth"
            >
              <Tab label="Login" value="1" />
              <Tab label="Signup" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <form autoComplete="off">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                onChange={(e) => setLoginUserEmail(e.target.value)}
              />
              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setLoginUserPassword(e.target.value)}
              />
              <Button
                style={{ width: "100%", marginTop: 20 }}
                variant="contained"
                onClick={loginUser}
              >
                Login
              </Button>
            </form>
          </TabPanel>

          <TabPanel value="2">
            <form autoComplete="off">
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                onChange={(e) => setRegisterUserName(e.target.value)}
              />

              <TextField
                fullWidth
                style={{ marginTop: 15 }}
                label="Email"
                variant="outlined"
                onChange={(e) => setRegisterUserEmail(e.target.value)}
              />

              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setRegisterUserPassword(e.target.value)}
              />

              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                type="password"
                label="Confirm Password"
                variant="outlined"
                onChange={(e) => setRegisterUserConfirmPassword(e.target.value)}
              />

              <TextField
                style={{ marginTop: 15 }}
                disabled
                onClick={() => {
                  document.getElementById("filePicker").click();
                }}
                fullWidth
                label={
                  registerUserProfilePicture
                    ? "Image Selected"
                    : "Upload Profile Picture"
                }
                variant="outlined"
              />

              <input
                id="filePicker"
                type="file"
                onChange={(e) =>
                  configureProfilePicture(
                    e.target.files[0],
                    showError,
                    setRegisterUserProfilePicture,
                    setLoading
                  )
                }
                style={{ display: "none" }}
              />

              <Button
                style={{ width: "100%", marginTop: 20 }}
                variant="contained"
                onClick={signupUser}
              >
                Signup
              </Button>
            </form>
          </TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
};

export default AuthModalComponent;
