import axios from "axios";
import { getAuthorizedConfig } from "../../constants/config";
import {
  GET_MESSAGES_ENDPOINT,
  SEND_MESSAGE_ENDPOINT,
} from "../../constants/endpoints";

export const getMessagesForChatAsync = async (
  currentUser,
  selectedChat,
  setMessages,
  showError,
  setLoadingMessages
) => {
  setLoadingMessages(true);
  try {
    const config = getAuthorizedConfig(currentUser.token);
    const getMessagesUrl = GET_MESSAGES_ENDPOINT + `/${selectedChat._id}`;
    console.log("Auth User: ", currentUser);
    console.log("Get Messages URL", getMessagesUrl);

    const { data } = await axios.get(getMessagesUrl, config);
    //console.log("Messages: ", data);
    setMessages(data);
    setLoadingMessages(false); 
    setTimeout(() => {
      const messageDiv = document.getElementById("containerMessages");
      messageDiv.scrollTop = messageDiv.scrollHeight + 20;
    }, 1000);
  } catch (e) {
    showError(e.message);
    setLoadingMessages(false);
  }
};

export const sendMessageAsync = async (
  socket,
  messageContent,
  selectedChat,
  currentUser,
  setMessageContent,
  getMessagesForChat,
  messages,
  setMessages,
  showError
) => {
  if (!messageContent || !selectedChat) {
    return;
  }

  try {
    const config = getAuthorizedConfig(currentUser.token);
    const { data } = await axios.post(
      SEND_MESSAGE_ENDPOINT,
      {
        chatId: selectedChat._id,
        messageContent: messageContent,
      },
      config
    );
    setMessageContent("");
    socket.emit("newMessage",data);
    console.log("Message Transferred to Socket", data);
    setMessages([...messages,data]);
    //getMessagesForChat();
    console.log(data);  
    setTimeout(() => {
      const messageDiv = document.getElementById("containerMessages");
      messageDiv.scrollTop = messageDiv.scrollHeight + 20;
    }, 1000);
  } catch (e) {
    showError(e.message);
  }
};
