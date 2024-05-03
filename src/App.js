// import logo from './logo.svg';
import './App.css';
import { Toaster } from 'react-hot-toast';
import React, { useState } from 'react'
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Header from './components/Header';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('token'));

  return (

    <Router>
      <Toaster position='top-center' />
      <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route exact path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
