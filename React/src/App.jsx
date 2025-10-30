import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from '../src/pages/Login/login.jsx';
import Home from '../src/components/HeaderHome/headerHome.jsx';
import Register from './pages/Resgister/register.jsx';
import Dashboard from './pages/Dashboard/dashboard.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
