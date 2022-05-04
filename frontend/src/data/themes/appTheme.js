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
      main: "#F34C60",
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
      light: "#44454e",
      main: "#22242A",
      dark: "#44454e",
      contrastText: "#fff",
    },
    homePrimaryVariant: {
      light: "#3d3e48",
      main: "#171821",
      dark: "#3d3e48",
      contrastText: "#fff",
    },
  },
});
