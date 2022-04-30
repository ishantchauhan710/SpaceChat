import { createContext, useContext, useState } from "react";

const AppContextProvider = createContext();

const AppContext = ({children}) => {

    const [showSnackbar,setShowSnackbar] = useState(false);
    const [snackbarVariant,setSnackbarVariant] = useState("success");
    const [snackbarMessage,setSnackbarMessage] = useState("");
    
    

    return (
        <AppContextProvider.Provider value={{showSnackbar,setShowSnackbar,snackbarVariant,setSnackbarVariant,snackbarMessage,setSnackbarMessage}}>
            {children}
        </AppContextProvider.Provider>
    )
}

export default AppContext

export const AppState = () => {
    return useContext(AppContextProvider);
}