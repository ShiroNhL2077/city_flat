
import "./App.css";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/Auth/login/login";
import Signup from "./components/Auth/signup/signup";
import Homepage from "./Pages/Homepage";
import LuxuryPage from "./Pages/LuxuryPage";

function App() {
  return (
    <div className="App"> 

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/luxury" element={<LuxuryPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
