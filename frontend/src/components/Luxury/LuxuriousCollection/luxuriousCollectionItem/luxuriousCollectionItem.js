import React, { useState } from "react";
import "../luxuriousCollectionItem/luxuriousCollectionItem.css";
import Rate from "../../../Rate/Rate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function LuxuriousCollectionItem() {
  const [rating1,setRating1] = useState(0);
  const [rating2,setRating2] = useState(0);
  return (
    <div className="luxurious_collection_items">

      <div>
        {" "}
        <div className="left_item">
          <div className="card_img">
            <img
              src="./luxury-apartments.png"
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="card_body">
          <div className="like_button">
                <button>
                  <FontAwesomeIcon icon={faHeart} beat className="highlight fa-2x" />
                </button>
          </div>
            <div className="card_content">
              <h3>APARTMENT NAME</h3>
              <p>Description about the house and stuff</p>
              <Rate rating={rating1} onRating={rate => setRating1(rate)}/>
              <strong>120€</strong>
            </div>  
          </div>
        </div>
        <div className="right_item"><div className="card_img">
            <img
              src="./luxury-apartments.png"
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="card_body">
          <div className="like_button">
                <button>
                  <FontAwesomeIcon icon={faHeart} beat className="highlight fa-2x" />
                </button>
          </div>
            <div className="card_content">
              <h3>APARTMENT NAME</h3>
              <p>Description about the house and stuff</p>
              <Rate rating={rating2} onRating={rate => setRating2(rate)}/>
              <strong>120€</strong>
            </div>  
          </div></div>
      </div>
    </div>
  );
}

export default LuxuriousCollectionItem;
