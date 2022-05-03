import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/system";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { HomePage } from "./pages/HomePage";

import { appTheme } from "./data/themes/appTheme";
import "./data/color/appColor.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarComponent } from "./components/Common/SnackbarComponent";
import { LoadingComponent } from "./components/Common/LoadingComponent";
import { AppState } from "./AppContext";


import "./stylesheets/LandingPage/LandingPage.css";
import "./stylesheets/HomePage/HomePage.css";
import "./stylesheets/HomePage/Chats.css";
import "./stylesheets/HomePage/Messages.css";
import "./stylesheets/HomePage/CreateChatModal.css";
import "./stylesheets/HomePage/ProfileComponent.css";







function App() {
  const mainTheme = createTheme(appTheme);

  const { loading } = AppState();


  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route exactclear path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
      {loading && <LoadingComponent />}
      <SnackbarComponent />
    </ThemeProvider>
  );
}

export default App;
