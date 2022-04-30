import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/system";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { HomePage } from "./pages/HomePage";

import { appTheme } from "./data/themes/appTheme";
import "./data/color/appColor.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarComponent } from "./components/Common/SnackbarComponent";

function App() {
  const mainTheme = createTheme(appTheme);

  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
      <SnackbarComponent variant="warning" message="ishant" />
    </ThemeProvider>
  );
}

export default App;
