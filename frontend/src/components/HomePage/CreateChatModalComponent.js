import React, { useState } from "react";

import {
    Box,
    Button,
    Modal,
    Tab,
    Tabs,
    TextField,
    Typography,
  } from "@mui/material";
  import TabContext from "@mui/lab/TabContext";
  import TabList from "@mui/lab/TabList";
  import TabPanel from "@mui/lab/TabPanel";
  

    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: "7px",
      backgroundColor: "#22242A",
      color: "#fff"
};
  

export const CreateChatModalComponent = ({ open, handleClose}) => {

  const [tabNum,setTabNum] = useState("1");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="container-create-chat-modal">
        <TabContext value={tabNum.toString()}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(event, tabValue) => setTabNum(tabValue)}
              variant="fullWidth"
              TabIndicatorProps={{style: {background:'#fff'}}}
              textColor="success"
            >
              <Tab label="Single Chat" value="1" />
              <Tab label="Group Chat" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            
        <input className="input-search-user" placeholder="Username or Email" />
          </TabPanel>

          <TabPanel value="2">
            Ishant
          </TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
};
