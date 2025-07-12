import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { Routes, Route, Navigate } from "react-router-dom";
import RefrshHandler from './RefrshHandler.jsx';

// import './App.css'

function App() {
  const [isAuthenticate,setisAuthenticate]=useState(false);
  

  const PrivateRoute=({element})=>{
    return (isAuthenticate)?element:<Navigate to="/login"/>
  }


  return (
    <div className="app">
      <RefrshHandler setisAuthenticate={setisAuthenticate} />
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/home" element={<PrivateRoute element={<Home/>} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </div>
  );
}

export default App;
