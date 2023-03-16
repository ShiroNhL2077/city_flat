import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Rate from '../../Rate/Rate';
import './StandardCollection.css'

function StandardCollection() {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [rating4, setRating4] = useState(0);
  const [rating5, setRating5] = useState(0);
  const [rating6, setRating6] = useState(0);
  return (
    <section className="standard__collection__page">
      <div className="standard_collection_items_title">
        <h2>OUR STANDARD COLLECTION</h2>
        <div className="line-in-middle"></div>
      </div>
      <div className="standard_collection_items_content">
      <div className="standard_collection_content">
        <div className="row">
          <div className="col">
            {" "}
            <div className="card">
              <div className="card_img">
                <img
                  src="./luxury-apartments.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card_body">
                <div className="like_button_standard">
                  <button>
                    <FontAwesomeIcon
                      icon={faHeart}
                      beat
                      className="highligh_standard"
                    />
                  </button>
                </div>
                <div className="card_content_standard">
                  <h3>APARTMENT NAME</h3>
                  <p>Description about the house and stuff</p>
                  <Rate
                    rating={rating2}
                    onRating={(rate) => setRating2(rate)}
                  />
                  <strong>120€</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
          <div className="card">
              <div className="card_img">
                <img
                  src="./luxury-apartments.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card_body">
                <div className="like_button_standard">
                  <button>
                    <FontAwesomeIcon
                      icon={faHeart}
                      beat
                      className="highlight_standard"
                    />
                  </button>
                </div>
                <div className="card_content_standard">
                  <h3>APARTMENT NAME</h3>
                  <p>Description about the house and stuff</p>
                  <Rate
                    rating={rating3}
                    onRating={(rate) => setRating3(rate)}
                  />
                  <strong>120€</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <div className="card">
              <div className="card_img">
                <img
                  src="./luxury-apartments.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card_body">
                <div className="like_button_standard">
                  <button>
                    <FontAwesomeIcon
                      icon={faHeart}
                      beat
                      className="highlight_standard "
                    />
                  </button>
                </div>
                <div className="card_content_standard">
                  <h3>APARTMENT NAME</h3>
                  <p>Description about the house and stuff</p>
                  <Rate
                    rating={rating4}
                    onRating={(rate) => setRating4(rate)}
                  />
                  <strong>120€</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
          <div className="card">
              <div className="card_img">
                <img
                  src="./luxury-apartments.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card_body">
                <div className="like_button_standard">
                  <button>
                    <FontAwesomeIcon
                      icon={faHeart}
                      beat
                      className="highlight_standard"
                    />
                  </button>
                </div>
                <div className="card_content">
                  <h3>APARTMENT NAME</h3>
                  <p>Description about the house and stuff</p>
                  <Rate
                    rating={rating5}
                    onRating={(rate) => setRating5(rate)}
                  />
                  <strong>120€</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <div className="card">
              <div className="card_img">
                <img
                  src="./luxury-apartments.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card_body">
                <div className="like_button_standard">
                  <button>
                    <FontAwesomeIcon
                      icon={faHeart}
                      beat
                      className="highlight_standard "
                    />
                  </button>
                </div>
                <div className="card_content_standard">
                  <h3>APARTMENT NAME</h3>
                  <p>Description about the house and stuff</p>
                  <Rate
                    rating={rating6}
                    onRating={(rate) => setRating6(rate)}
                  />
                  <strong>120€</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
          <div className="card">
              <div className="card_img">
                <img
                  src="./luxury-apartments.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card_body">
                <div className="like_button_standard">
                  <button>
                    <FontAwesomeIcon
                      icon={faHeart}
                      beat
                      className="highlight_standard"
                    />
                  </button>
                </div>
                <div className="card_content_standard">
                  <h3>APARTMENT NAME</h3>
                  <p>Description about the house and stuff</p>
                  <Rate
                    rating={rating1}
                    onRating={(rate) => setRating1(rate)}
                  />
                  <strong>120€</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default StandardCollection