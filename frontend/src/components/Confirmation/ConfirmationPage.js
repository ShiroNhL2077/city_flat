import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import Rate from "../Rate/Rate";
import "./ConfirmationPage.css";

function PaymentPage() {
  const [rating, setRating] = useState(0);

  return (
    <div className="payment_page">
      <Navbar />
      <div className="upper__space"></div>
      <div className="payment__body">
        <div className="payment__content">
          <div className="payment_title">
            <h3>CONFIRM YOUR PAYMENT</h3>
          </div>
          <div className="row row_props ">
            <div className="col payment_col">
              <div className="card__body__payment">
                <h4>Reservation details</h4>
                <h5>Nights :10</h5>
                <h5>
                  from <strong>21/11/2013 </strong>to{" "}
                  <strong>01/12/2023</strong>.
                </h5>
                <hr />
                <h4>Services</h4>
                <div className="row services">
                  <div className="col col-sm-2">
                    <img
                      alt="service parking"
                      src="./parking.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Parking</p>
                  </div>
                  <div className="col col-sm-2">
                    <img
                      alt="service parking"
                      src="./food.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Food</p>
                  </div>
                  <div className="col col-sm-2">
                    <img
                      alt="service parking"
                      src="./washing.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Laundry</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col content_col_payment"
              style={{ backgroundColor: "white" }}
            >
              <div className="card_infos_payment">
                <div className="card__body">
                  <h4>APARTMENT NAME</h4>
                  <strong style={{ marginBottom: "5%" }}>
                    Description about the house <br />
                    and stuff
                  </strong>
                  <Rate rating={rating} onRating={(rate) => setRating(rate)} />
                  <img
                    alt="apartment_picture"
                    className="apartment_picture"
                    src="./interior-design-ga22c634af_19201.png"
                  />
                  <h4>Payment details:</h4>
                  <p>Nights fee: €600</p>
                  <p>Services fee: €60</p>
                  <p>Total price: €660</p>
                  <button className="btn btn-dark custom-confirm-button" >CONFIRM & PAY</button>
                  <a href="/"><button type="reset" className="btn btn-dark custom-confirm-button" >CANCEL</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </div>
      <Footer />
    </div>
  );
}

export default PaymentPage;
