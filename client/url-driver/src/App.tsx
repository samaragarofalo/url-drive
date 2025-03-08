import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Signup from './components/signup/SignUp';
import Login from './components/login/Login';
import FileManager from './components/file-manager/FileManager';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/files" element={<FileManager />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;