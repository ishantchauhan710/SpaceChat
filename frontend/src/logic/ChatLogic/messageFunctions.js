import axios from "axios";
import { getAuthorizedConfig } from "../../constants/config";
import { GET_MESSAGES_ENDPOINT, SEND_MESSAGE_ENDPOINT } from "../../constants/endpoints";

export const getMessagesForChatAsync = async (currentUser,selectedChat,setMessages,showError) => {
    try {
      const config = getAuthorizedConfig(currentUser.token);
      const getMessagesUrl = GET_MESSAGES_ENDPOINT + `/${selectedChat._id}`;
      console.log("Auth User: ", currentUser);
      console.log("Get Messages URL", getMessagesUrl);

      const { data } = await axios.get(getMessagesUrl, config);
      //console.log("Messages: ", data);
      setMessages(data);
    } catch (e) {
      showError(e.message);
    }
  };

  export const sendMessageAsync = async (messageContent,selectedChat,currentUser,setMessageContent,getMessagesForChat,showError) => {
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
      getMessagesForChat();
      console.log(data);
    } catch (e) {
      showError(e.message);
    }
  };