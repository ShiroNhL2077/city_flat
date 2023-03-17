import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import Rate from "../Rate/Rate";
import "./PaymentPage.css";

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
                  <p>Night fee: €120</p>
                  <p>Services fee: €60</p>
                  <p>Total price: €1200</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="upper__space"></div>
        <div className="payment__content">
          <div className="payment_title">
            <h3>PAYMENT PEREFRENCES</h3>
          </div>
          <div className="row row_props ">
            <div className="card__body no__margin">
              <div className="row">
                <div className="col col-8 align_left">
                  {" "}
                  <p>Full Payment</p>
                  <p>Pay full amount now </p>
                </div>
                <div className="col col-4 align_right">
                  {" "}
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkboxNoLabel"
                      value=""
                      aria-label="..."
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col col-8 align_left">
                  {" "}
                  <p>Half Payment</p>
                  <p>Pay Half amount now </p>
                </div>
                <div className="col col-4 align_right">
                  {" "}
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkboxNoLabel"
                      value=""
                      aria-label="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="upper__space"></div>
        <div className="payment__content">
          <div className="payment_title">
            <h3>CONFIRM YOUR PAYMENT</h3>
          </div>
          <div className="row row_props ">
            <div className="col form_col">
              <div className="card__body">
                <div className="row gx-3">
                  <div className="col-12">
                    <div className="d-flex flex-column">
                      <div className="input-wrap">
                        <label className="label-form">Your name</label>
                        <input
                          type="text"
                          minLength="4"
                          className="input-field mb-4"
                          autoComplete="off"
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-column">
                      <div className="input-wrap">
                        <label className="label-form">Card number</label>
                        <input
                          type="number"
                          minLength="4"
                          className="input-field"
                          autoComplete="off"
                          placeholder="1254 5222 69584"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <div className="input-wrap">
                        <label className="label-form">Expiry</label>
                        <input
                          type="date"
                          minLength="4"
                          className="input-field"
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <div className="input-wrap">
                        <label className="label-form">CVV/CVC</label>
                        <input
                          type="password"
                          minLength="4"
                          maxLength="4"
                          className="input-field"
                          autoComplete="off"
                          placeholder="****"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-column">
                      <div className="input-wrap">
                        <label className="label-form">Zip code</label>
                        <input
                          type="text"
                          minLength="4"
                          className="input-field"
                          autoComplete="off"
                          placeholder="Zip code"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col content_col"
              style={{ backgroundColor: "white" }}
            >
              <div className="card_infos">
                <div className="card__body">
                  <div className="col-12">
                    <div className="d-flex flex-column">
                      <label className="label-form">Country region</label>
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-select mb-3 input-field"
                        aria-label="Default select example"
                      >
                        <option value="DEFAULT" disabled>
                          Country Region
                        </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>{" "}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-column">
                      <p className="cancellation_policy">
                        CANCELLATION POLICY:
                      </p>
                      <p>
                        Free cancellation before Apr 24.Cancel before check-in
                        on May 1 for a partial refund .{" "}
                        <a href="#/">Learn more</a>
                      </p>
                    </div>
                  </div>
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
