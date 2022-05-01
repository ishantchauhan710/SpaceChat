import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { SEARCH_USER_ENDPOINT } from "../../constants/endpoints";
import axios from "axios";

import { AppState } from "../../AppContext";
import { trimString } from "../../util/StringUtil";
import { getAuthorizedConfig } from "../../constants/config";
import { UserSearchResultComponent } from "./UserSearchResultComponent";

export const CreateChatModalComponent = ({ open, handleClose }) => {
  const { currentUser, setCurrentUser } = AppState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "7px",
    backgroundColor: "#22242A",
    color: "#fff",
  };

  const [tabNum, setTabNum] = useState("1");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { showError } = AppState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchResults([]);
      searchUser(searchQuery);
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const searchUser = async () => {
    let trimmedSearchQuery = trimString(searchQuery);
    if (trimmedSearchQuery === null) {
      return;
    }

    const searchUrl = SEARCH_USER_ENDPOINT + `?search=${trimmedSearchQuery}`;
    console.log(searchUrl);

    try {
      setLoading(true);
      //console.log('Token: ',currentUser.token)
      const config = getAuthorizedConfig(currentUser.token);
      const { data } = await axios.get(searchUrl, config);
      console.log(data);
      setSearchResults(data);
      setLoading(false);
    } catch (e) {
      showError(e.message);
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="container-create-chat-modal">
        <TabContext value={tabNum.toString()}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(event, tabValue) => setTabNum(tabValue)}
              variant="fullWidth"
              TabIndicatorProps={{ style: { background: "#fff" } }}
              textColor="success"
            >
              <Tab label="Single Chat" value="1" />
              <Tab label="Group Chat" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <input
              className="input-search-user"
              placeholder="Username or Email"
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="container-user-search">
              {loading ? <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}><CircularProgress color="secondary" /></div> : <></>}

              <div className="container-user-search-results">

              {!loading && searchResults.length>0 && searchResults.map((searchItem) => (
                <UserSearchResultComponent user={searchItem} />
              ))}

              </div>
            </div>
          </TabPanel>

          <TabPanel value="2">Ishant</TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
};
