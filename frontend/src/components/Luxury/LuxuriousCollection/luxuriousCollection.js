import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Rate from "../../Rate/Rate";
import "./luxuriouCollection.css";

function LuxuriousCollection() {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [rating4, setRating4] = useState(0);
  const [rating5, setRating5] = useState(0);
  const [rating6, setRating6] = useState(0);

  const [apartments, setApartments] = useState([]);

  /*useEffect(() =>{
    fetch('http://localhost:9090/appartments/getAllAppart')
    .then(resp => resp.json())
    .then((data) => setApartments(data))
    .catch ((error) => console.log({error}));
  },[]);*/

  useEffect(() => {
    axios
      .get("http://localhost:9090/appartments/getAllAppart")
      .then((result) => {
        setApartments(result.data);
        console.log();
        
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="luxury__collection__page">
      <div className="luxury_collection_items_title">
        <h2>OUR PREMIUM COLLECTION</h2>
        <div className="line-in-middle"></div>
      </div>
      <div className="luxury_collection_items_content">
        <div className="luxury_collection_content">
          <div className="row">
            {apartments.map((data) => {
              if (data.type ==="LUXURY") {
                return (
                  <div className="col-sm-6" key={data.id}>
                    {" "}
                    <div className="card">
                      <div className="card_img">
                        <img src="./luxury-apartments.png" className="card-img-top" alt="..." />
                      </div>
                      <div className="card_body">
                        <div className="like_button_luxury">
                          <button>
                            <FontAwesomeIcon
                              icon={faHeart}
                              beat
                              className="highlight_luxury"
                            />
                          </button>
                        </div>
                        <div className="card_content_luxury">
                          <h3>{data.name}</h3>
                          <p>{data.description}</p>
                          <Rate
                            rating={rating2}
                            onRating={(rate) => setRating2(rate)}
                          />
                          <strong>{data.pricePerNight}€</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );  
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LuxuriousCollection;
