import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import FileManager from './components/file-manager/FileManager';
import FileDownload from './components/file-manager/FileDownload';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/files" element={<FileManager />} />
        <Route path="/download/*" element={<FileDownload />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
