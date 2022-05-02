import React, { useEffect } from "react";

export const UserSearchResultComponent = ({
  user,
  groupMembers,
  setGroupMembers,
  createChat
}) => {
  const addToGroup = () => {
    if (!groupMembers.includes(user.sc_userEmail)) {
      setGroupMembers([...groupMembers, user.sc_userEmail]);
    }
    console.log("\nGroup Members",groupMembers);
  };

  // useEffect(() => {
  //   console.log("Chat Users", user)
  // },[])


  return (
    <div onClick={() => createChat(user._id)} className="user-search-result">
      <img
        className="user-search-result-profile-picture"
        src={user.sc_userProfilePicture}
      />
      <div className="user-search-result-data">
        <div className="user-search-result-name-time-container">
          <span className="user-search-result-username">
            {user.sc_userName}
          </span>
        </div>
        <span className="user-search-result-email">{user.sc_userEmail}</span>
      </div>
    </div>
  );
};
