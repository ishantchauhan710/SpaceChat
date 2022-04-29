import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/system";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { appTheme } from "./data/themes/appTheme";
import "./data/color/appColor.css";

function App() {
  const mainTheme = createTheme(appTheme);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="App">
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
