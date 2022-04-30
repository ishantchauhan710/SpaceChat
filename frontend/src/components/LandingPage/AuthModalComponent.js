import {
  Box,
  Button,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { SnackbarComponent } from "../Common/SnackbarComponent";
import { AppState } from "../../AppContext";
import axios from 'axios';

const AuthModalComponent = ({ open, handleClose, tabNum, setTabNum }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "7px",
  };

  const {
    showSnackbar,
    setShowSnackbar,
    snackbarVariant,
    setSnackbarVariant,
    snackbarMessage,
    setSnackbarMessage,
  } = AppState();

  const [registerUserName, setRegisterUserName] = useState();
  const [registerUserEmail, setRegisterUserEmail] = useState();
  const [registerUserPassword, setRegisterUserPassword] = useState();
  const [registerUserConfirmPassword, setRegisterUserConfirmPassword] =
    useState();
  const [registerUserProfilePicture, setRegisterUserProfilePicture] =
    useState();


  const [loading, setLoading] = useState(false);

  const showError = (errMsg) => {
    setSnackbarMessage(errMsg);
    setSnackbarVariant("error");
    setShowSnackbar(true);
  };

  const showSuccess = (successMsg) => {
    setSnackbarMessage(successMsg);
    setSnackbarVariant("success");
    setShowSnackbar(true);
  };

  

  const configureProfilePicture = (picture) => {
    if (!picture) {
      showError("Please select an image");
    }

    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "notescout");
      data.append("cloud_name", "ishantchauhan");
      fetch("https://api.cloudinary.com/v1_1/ishantchauhan/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data:", data);
          setRegisterUserProfilePicture(data.url.toString());
        })
        .catch((e) => {
          showError(e);
        });
    } else {
      return showError("Image format not supported");
    }
  };

 

  const signupUser = async () => {
    setLoading(true);
    if (!registerUserName) {
      showError("Name cannot be blank");
      return;
    } else if (!registerUserEmail) {
      showError("Email cannot be blank");
      return;
    } else if (!registerUserPassword) {
      showError("Password cannot be blank");
      return;
    } else if (registerUserPassword !== registerUserConfirmPassword) {
      showError("Passwords do not match");
      return;
    } else {
      try {

        const config = {headers: {
          "Content-type":"application/json"
        }}

        console.log(registerUserName)

        const {data} = await axios.post("/user/signup",{
          userName:registerUserName,
          userEmail:registerUserEmail,
          userPassword:registerUserPassword,
          userProfilePicture:registerUserProfilePicture
        },config);

        showSuccess("Account created successfully!");
        setLoading(false);

      } catch(error) {
          showError(error.response.data.message);
          setLoading(false);
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="container-auth-modal">
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
                label="Email or Username"
                variant="outlined"
              />
              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
              />
              <Button
                style={{ width: "100%", marginTop: 20 }}
                variant="contained"
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
                onChange={(e) => configureProfilePicture(e.target.files[0])}
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
