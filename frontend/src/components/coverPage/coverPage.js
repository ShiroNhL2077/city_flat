import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import "./coverPage.css";

function coverPage() {
  return (
    <div className="header">
      <div>
        <h1 className="title">
          BOOK YOUR NEXT GETAWAY AND LET US TAKE CARE OF THE REST!
        </h1>
      </div>

      
        <form className="search">
          <input
            className="search__input"
            type="text"
            id="search"
            placeholder="Search"
          />
          <button className="search__filter">
            {" "}
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </form>
      
    </div>
  );
}

export default coverPage;
