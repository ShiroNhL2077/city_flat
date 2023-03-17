import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import CarouselPage from "../../utils/Carousel";
import "./Wishlist.css";

function Wishlist() {
  return (
    <div className="wishlist_page">
      <Navbar />
      <div className="content_page">
        <div className="upper__space"></div>
        <div className="upper__space wishlist_title">
            <h1>WISHLIST</h1>
        </div>
        <div className="wishlist__body">
          <div className="wishlist__content">
            <div className="row pb-5">
              <div className="col">
                <CarouselPage/>
              </div>
              <div className="col wishlist_description">
                <h1>LIST NAME</h1>
              </div>
            </div>
            <div className="row pb-5">
                              <div className="col wishlist_description">
                <h1>LIST NAME</h1>
              </div>
              <div className="col">
                <CarouselPage/>
              </div>

            </div>
            <div className="row pb-5">
              <div className="col">
                <CarouselPage/>
              </div>
              <div className="col wishlist_description">
                <h1>LIST NAME</h1>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;
