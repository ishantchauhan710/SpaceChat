import axios from "axios";
import { LOGIN_ENDPOINT } from "../../constants/endpoints";
import { CONFIG_JSON } from "../../constants/config";

export const validateLogin = (
    showError,
    loginUserEmail,
    loginUserPassword
  ) => {
  
    if (!loginUserEmail) {
      showError("Email cannot be blank");
      return false;
    }
  
    if (!loginUserPassword) {
      showError("Password cannot be blank");
      return false;
    }

    return true;
  };

export const loginUserAccount = async (
    setLoading,
    showError,
    loginUserEmail,
    loginUserPassword,
    showSuccess,
    navigate
  ) => {
    setLoading(true);
  
    if (
      validateLogin(
        showError,
        loginUserEmail,
        loginUserPassword
      ) === false
    ) {
      setLoading(false)
      return;
    }
  
    try {
      const { data } = await axios.post(
        LOGIN_ENDPOINT,
        {
          userEmail: loginUserEmail,
          userPassword: loginUserPassword
        },
        CONFIG_JSON
      );
  
      localStorage.setItem("userInfo",JSON.stringify(data));
      navigate('/home');
      showSuccess("User logged in successfully!");
      setLoading(false);
    } catch (error) {
      showError(error.response.data.message);
      setLoading(false);
    }
  };
  