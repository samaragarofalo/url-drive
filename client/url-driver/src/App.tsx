import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Signup from './components/signup/SignUp';
import Login from './components/login/Login';
import FileManager from './components/file-manager/FileManager';
import Navbar from './components/navbar/Navbar';
import DownloadPage from './components/file-manager/FileDownload';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import darkTheme from './components/styles/theme';


function App() {
  const location = useLocation();
  useEffect(() => {
    console.log("🚀 Rota acessada:", location.pathname);
  }, [location]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Container>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/files" element={<FileManager />} />
            <Route path="/download/*" element={<DownloadPage/>}/>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;