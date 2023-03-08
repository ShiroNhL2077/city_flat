
import "./App.css";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/Auth/login/login";
import Signup from "./components/Auth/signup/signup";
import Navbar from "./components/Navbar/Navbar";
import CoverPage from "./components/Home/coverPage/coverPage";
import Luxury from "./components/Home/Luxury/luxury";
import Premium from "./components/Home/Premium/premium";
import Standard from "./components/Home/Standard/standard";
import Footer from "./components/Footer/footer"
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="App"> 

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
