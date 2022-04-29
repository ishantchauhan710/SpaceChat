import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      light: '#313143',
      main: '#0a091c',
      dark: '#060419',
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