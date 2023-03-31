import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import Rate from "../Rate/Rate";
import "./ConfirmationPage.css";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(
  "pk_test_51Mo7T4CVJIsh8jvhT4XERDGMYNJjV3zpKsnVxpD79NGbrGT2337sDSuengg06jYxuRwvMShAg91ih2ziOUUKJD6000ci0xZXRW"
);

function PaymentPage() {
  const [rating, setRating] = useState(0);
  const handleToken = (token) => {
    // You can use the token to process the payment on the server-side
    console.log(token);
  };

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    createPaymentIntent().then((secret) => {
      setClientSecret(secret);
    });
  }, []);

  const stripe = useStripe();
  const handleClick = async (event) => {
    // Call your backend to create a Checkout Session
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: ["sku_123"] }), // replace with your own SKU, plan, or price IDs
    });

    const session = await response.json();

    // Redirect to Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
      lineItems: [
        {
          price: "price_123",
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

const createPaymentIntent = async () => {
  const response = await fetch("/api/payment-intent", { method: "POST" });
  const { clientSecret } = await response.json();
  return clientSecret;
};

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
                  <a href="/">
                    <button
                      type="reset"
                      className="btn btn-dark custom-confirm-button"
                    >
                      CANCEL
                    </button>
                  </a>
                  <button
                    className="btn btn-dark custom-confirm-button"
                    onClick={handleClick}
                  >
                    CONFIRM & PAY
                  </button>
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
