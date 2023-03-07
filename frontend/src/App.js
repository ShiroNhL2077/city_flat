
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
import CoverPage from "./components/coverPage/coverPage";
import Luxury from "./components/Home/Luxury/luxury";
import Premium from "./components/Home/Premium/premium";
import Standard from "./components/Home/Standard/standard";
import Footer from "./components/Footer/footer"

function App() {
  return (
    <div className="App"> 
    <Navbar/>  
			<CoverPage/>
      <Luxury/>
      <Premium/>
      <Standard/>
      <Footer/>
      <BrowserRouter>
      <Routes>
        <Route path="/"/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
