import React from "react";
import "../luxuriousCollectionItem/luxuriousCollectionItem.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function luxuriousCollectionItem() {
  return (
    <div className="luxurious_collection_items">
      <div className="luxurious_collection_items_title">
        <h2>OUR LUXURIOUS COLLECTION</h2>
        <div className="line-in-middle"></div>
      </div>
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
            </div>  
          </div>
        </div>
        <div className="right_item">right</div>
      </div>
    </div>
  );
}

export default luxuriousCollectionItem;
