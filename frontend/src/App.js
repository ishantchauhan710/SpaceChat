import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/system';
import './App.css';
import { LoginPage } from './pages/LoginPage';
import { appTheme } from './themes/appTheme';

function App() {

  const mainTheme = createTheme(appTheme);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="App">
        <LoginPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
