import React, { useState, useEffect } from "react";
import "./Navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="nav">
      <div className="navbar-menu">
        <FontAwesomeIcon icon={faNavicon} className="fa-2x" />
      </div>

      <div className="navbar-user">
        <FontAwesomeIcon icon={faUserCircle} className="fa-2x" />
      </div>
    </nav>
  );
}

export default Navbar;
