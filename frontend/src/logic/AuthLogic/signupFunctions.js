import axios from "axios";
import { CONFIG_JSON } from "../../constants/config";
import { SIGNUP_ENDPOINT } from "../../constants/endpoints";

export const validateSignup = (
  showError,
  registerUserName,
  registerUserEmail,
  registerUserPassword,
  registerUserConfirmPassword
) => {
  if (!registerUserName) {
    showError("Name cannot be blank");
    return false;
  }

  if (!registerUserEmail) {
    showError("Email cannot be blank");
    return false;
  }

  if (!registerUserPassword) {
    showError("Password cannot be blank");
    return false;
  }

  if (registerUserPassword !== registerUserConfirmPassword) {
    showError("Passwords do not match");
    return false;
  }

  return true;
};

export const configureProfilePicture = (
  picture,
  showError,
  setRegisterUserProfilePicture,
  setLoading
) => {
  setLoading(true);

  if (!picture) {
    showError("Please select an image");
    setLoading(false);
    return;
  }

  if (picture.type === "image/jpeg" || picture.type === "image/png") {
    const data = new FormData();
    data.append("file", picture);
    data.append("upload_preset", "notescout");
    data.append("cloud_name", "ishantchauhan");
    fetch("https://api.cloudinary.com/v1_1/ishantchauhan/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data);
        setRegisterUserProfilePicture(data.url.toString());
        setLoading(false);
      })
      .catch((e) => {
        showError(e);
        setLoading(false);
      });
  } else {
    showError("Image format not supported");
    setLoading(false);
    return;
  }
};

export const signupUserAccount = async (
  setLoading,
  showError,
  registerUserName,
  registerUserEmail,
  registerUserPassword,
  registerUserConfirmPassword,
  showSuccess,
  registerUserProfilePicture,
  navigate
) => {
  setLoading(true);

  if (
    validateSignup(
      showError,
      registerUserName,
      registerUserEmail,
      registerUserPassword,
      registerUserConfirmPassword
    ) === false
  ) {
    setLoading(false)
    return;
  }

  try {
    const { data } = await axios.post(
      SIGNUP_ENDPOINT,
      {
        userName: registerUserName,
        userEmail: registerUserEmail,
        userPassword: registerUserPassword,
        userProfilePicture: registerUserProfilePicture,
      },
      CONFIG_JSON
    );

    localStorage.setItem("userInfo",JSON.stringify(data));
    navigate('/home');
    showSuccess("Account created successfully!");
    setLoading(false);
  } catch (error) {
    showError(error.response.data.message);
    setLoading(false);
  }
};
