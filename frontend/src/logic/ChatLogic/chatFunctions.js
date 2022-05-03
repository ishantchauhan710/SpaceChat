import axios from "axios";
import { getAuthorizedConfig } from "../../constants/config";
import {
  CREATE_CHAT_ENDPOINT,
  GET_CHATS_ENDPOINT,
} from "../../constants/endpoints";

export const getChatsAsync = async (
  currentUser,
  setChats,
  showError,
  setLoadingChats
) => {
  if (!currentUser) {
    return;
  }
  try {
    setLoadingChats(true);
    const config = getAuthorizedConfig(currentUser.token);
    const { data } = await axios.get(GET_CHATS_ENDPOINT, config);
    //console.log(data);
    setChats(data);
    setLoadingChats(false);
  } catch (e) {
    showError(e.message);
    setLoadingChats(false);
  }
};

export const createChatAsync = async (
  chatPersonId,
  currentUser,
  setChat,
  getChats,
  showError
) => {
  try {
    const config = getAuthorizedConfig(currentUser.token);
    const { data } = await axios.post(
      CREATE_CHAT_ENDPOINT,
      {
        userId: chatPersonId,
      },
      config
    );
    //console.log(data);
    setChat(data);
    getChats();
  } catch (e) {
    showError(e.message);
  }
};


