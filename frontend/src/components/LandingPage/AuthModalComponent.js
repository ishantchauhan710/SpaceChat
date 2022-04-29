import {
  Box,
  Button,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const AuthModalComponent = ({ open, handleClose, tabNum }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "7px",
  };

  console.log(tabNum);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="container-auth-modal">
        <TabContext value={tabNum}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList variant="fullWidth">
              <Tab label="Login" value={1} />
              <Tab label="Signup" value={2} />
            </TabList>
          </Box>
          <TabPanel value={1}>
            <form autoComplete="off">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email or Username"
                variant="outlined"
              />
              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                id="outlined-basic"
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

          <TabPanel value={2}>
            <form autoComplete="off">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />

              <TextField
                fullWidth
                style={{ marginTop: 15 }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />

              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                id="outlined-basic"
                type="password"
                label="Password"
                variant="outlined"
              />

              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                id="outlined-basic"
                type="password"
                label="Confirm Password"
                variant="outlined"
              />

              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                id="outlined-basic"
                label="Profile Picture"
                variant="outlined"
              />

              <Button
                style={{ width: "100%", marginTop: 20 }}
                variant="contained"
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
