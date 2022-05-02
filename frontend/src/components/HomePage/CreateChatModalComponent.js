import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
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

export const CreateChatModalComponent = ({ open, handleClose, createChat }) => {
  const { currentUser, setCurrentUser } = AppState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchGroupUserQuery, setSearchGroupUserQuery] = useState("");
  const [tabNum, setTabNum] = useState("1");
  const [searchResults, setSearchResults] = useState([]);
  const [searchGroupUserResults, setSearchGroupUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const { showError } = AppState();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchResults([]);
      searchUser(searchQuery, setSearchResults);
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchGroupUserResults([]);
      searchUser(searchGroupUserQuery, setSearchGroupUserResults);
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchGroupUserQuery]);

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

  const searchUser = async (searchWhom, setSearchWhom) => {
    let trimmedSearchQuery = trimString(searchWhom);
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
      setSearchWhom(data);
      setLoading(false);
    } catch (e) {
      showError(e.message);
      setLoading(false);
    }
  };

  const removeMemberFromGroup = (member) => {
    try {
      const updatedGroupMembers = groupMembers.filter((groupMember) => {
        console.log("Group Member", groupMember);
        console.log("Member", member);
        return groupMember !== member;
      });
      setGroupMembers(updatedGroupMembers);
      console.log("Chip Deleted", updatedGroupMembers);
    } catch (e) {
      console.log("Error", e.message);
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
              {loading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                <></>
              )}

              <div className="container-user-search-results">
                {!loading &&
                  searchResults.length > 0 &&
                  searchResults.map((searchItem) => (
                    <UserSearchResultComponent user={searchItem} createChat={createChat} />
                  ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value="2">
            <input className="input-search-user" placeholder="Group Name" />
            <input
              className="input-search-user"
              placeholder="Add Members"
              style={{ marginTop: 10 }}
              onChange={(e) => setSearchGroupUserQuery(e.target.value)}
            />

            <div className="container-group-search">
              {loading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                <></>
              )}

              <div className="container-user-search-results">
                {!loading &&
                  searchGroupUserResults.length > 0 &&
                  searchGroupUserResults.map((searchItem) => (
                    <UserSearchResultComponent
                      key={searchItem.sc_userEmail}
                      groupMembers={groupMembers}
                      setGroupMembers={setGroupMembers}
                      user={searchItem}
                    />
                  ))}
              </div>
            </div>
            <div className="container-group-member-chips">
              {groupMembers.length > 0 &&
                groupMembers.map((member) => (
                  <Chip
                    size="small"
                    color="secondary"
                    label={member}
                    onDelete={() => removeMemberFromGroup(member)}
                    style={{ marginLeft: 10, marginTop: 7 }}
                  />
                ))}
            </div>
            <Button
              color="success"
              variant="contained"
              style={{ width: "100%", margin: "20px 20px 10px 10px" }}
            >
              Create Group
            </Button>
          </TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
};
