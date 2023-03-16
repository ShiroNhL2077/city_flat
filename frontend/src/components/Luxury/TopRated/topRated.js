import React, { useState } from "react";
import "./topRated.css";
import Rate from "../../Rate/Rate";

function TopRated() {
  const [rating, setRating] = useState(0);
  return (
    <div className="top_rated_page">
      <div className="top__container">
        <div className="left__side">
        <img alt="" src="./r-architecture-wDDfbanbhl8-unsplash.png" />
        </div>
        <div className="right__side">
          <div className="right__side__content">
          <h2>OUR BEST APARTMENT</h2>
          <h4>SEBASTIAN-STAINES</h4>
          <p>Description about house and stuff</p>
          <Rate rating={rating}  onRating={rate => setRating(rate)}/>
          <strong>120€</strong>
          </div>
          <div className="more__details__button">
          <a href="something" className="button1"><button type="button" class="btn btn-outline-dark">Dark</button></a>
        </div>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
