import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      light: "#313143",
      main: "#0a091c",
      dark: "#060419",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fd6eec",
      main: "#C738B9",
      dark: "#930089",
      contrastText: "#000",
    },
    success: {
      light: "#76d275",
      main: "#43a047",
      dark: "#00701a",
      contrastText: "#fff",
    },
    homePrimary: {
      light: "#0f0e13",
      main: "#0f0e13",
      dark: "#0f0e13",
      contrastText: "#fff",
    },
    homePrimaryVariant: {
      light: "#4a4c52",
      main: "#22242A",
      dark: "#4a4c52",
      contrastText: "#fff",
    },
  },
});
