import { createContext, useContext, useState } from "react";

const AppContextProvider = createContext();

const AppContext = ({ children }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const showError = (errMsg) => {
    setSnackbarMessage(errMsg);
    setSnackbarVariant("error");
    setShowSnackbar(true);
  };

  const showSuccess = (successMsg) => {
    setSnackbarMessage(successMsg);
    setSnackbarVariant("success");
    setShowSnackbar(true);
  };

  const [currentUser, setCurrentUser] = useState();

  return (
    <AppContextProvider.Provider
      value={{
        showSnackbar,
        setShowSnackbar,
        snackbarVariant,
        setSnackbarVariant,
        snackbarMessage,
        setSnackbarMessage,
        loading,
        setLoading,
        showSuccess,
        showError,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContextProvider.Provider>
  );
};

export default AppContext;

export const AppState = () => {
  return useContext(AppContextProvider);
};
