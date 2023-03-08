import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown/dropdown";
import "./Navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar() {

  const [openProfile , setOpenProfile] = useState(false)
  
  return (
    <nav className="nav">
      <div className="navbar-menu">
       <button> <FontAwesomeIcon icon={faNavicon} className="fa-2x" /></button>
      </div>

      <div className="navbar-user">
       <button onClick={() => setOpenProfile(!openProfile) }> <FontAwesomeIcon icon={faUserCircle} className="fa-2x" /></button>
          
          {
            openProfile && <Dropdown/>
          }
        
      </div>
    </nav>
  );
}

export default Navbar;
