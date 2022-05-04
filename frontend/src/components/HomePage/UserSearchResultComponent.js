import React, { useEffect } from "react";

export const UserSearchResultComponent = ({
  user,
  groupMembers,
  setGroupMembers,
  createChat,
  mode // "single": Single Chat, "group": Group Chat
}) => {

  const performUserItemOnClick = () => {
    if(mode==="single") {
      createChat(user._id)
    } else if(mode==="group") {
      addToGroup();
    } else {
      console.log("User onclick mode not defined");
    }
  }

  const addToGroup = () => {
    if (!groupMembers.includes(user)) {
      setGroupMembers([...groupMembers, user]);
    }
    console.log("\nGroup Members", groupMembers);
  };

  // useEffect(() => {
  //   console.log("Chat Users", user)
  // },[])

  return (
    <div onClick={() => performUserItemOnClick()} className="user-search-result">
      <img
        className="user-search-result-profile-picture"
        src={user.userProfilePicture}
      />
      <div className="user-search-result-data">
        <div className="user-search-result-name-time-container">
          <span className="user-search-result-username">{user.userName}</span>
        </div>
        <span className="user-search-result-email">{user.userEmail}</span>
      </div>
    </div>
  );
};
