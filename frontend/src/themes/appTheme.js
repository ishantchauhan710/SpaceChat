import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      light: '#6f87f4',
      main: '#355bc1',
      dark: '#003390',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    success: {
      light: '#76d275',
      main: '#43a047',
      dark: '#00701a',
      contrastText: '#fff',
    },
    
  },
});