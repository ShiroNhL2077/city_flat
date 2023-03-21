import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import CarouselPage from "../../utils/Carousel";
import Rate from "../Rate/Rate";
import "./ApartmentDetails.css";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import L from "leaflet";

function ApartmentDetails() {
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="apartment_details">
      <Navbar />
      <div className="apartment_details_content">
        <div className="upper__space"></div>
        {/** Apartment Details */}

        <div className="row">
          <div className="details__app">
            <div className="app_carousel">
              <CarouselPage />
            </div>
            <div className="app_details">
              <div className="row all__details">
                <div className="app_title">
                  <h1>APARTMENT NAME</h1>
                  <h5>144 Street dusseldorf, Germany</h5>
                  <Rate rating={rating} onRating={(rate) => setRating(rate)} />
                </div>
              </div>

              <div className="row app_description">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur tempor commodo molestie. Duis sit amet ipsum ligula.
                  Sed sit amet ex mauris. Maecenas elit eros, sodales vitae
                  accumsan ac, hendrerit vitae felis.
                </p>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light custom-button "
                  >
                    Show reviews
                  </button>
                </div>
              </div>
              <div className="services_details">
                <div className="row" style={{ padding: "2%" }}>
                  <strong>Choose your services:</strong>
                </div>

                <div className="row">
                  <div className="col">
                    <img
                      alt="service parking"
                      src="./cleaning.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Cleaning</p>
                  </div>
                  <div className="col">
                    <img
                      alt="service parking"
                      src="./maintenance.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Maintenance</p>
                  </div>
                  <div className="col">
                    <img
                      alt="service parking"
                      src="./utilities.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Utilities</p>
                  </div>
                  <div className="col">
                    <img
                      alt="service parking"
                      src="./washing.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Laundry</p>
                  </div>
                  <div className="col">
                    <img
                      alt="service parking"
                      src="./parking.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Parking</p>
                  </div>
                  <div className="col">
                    <img
                      alt="service parking"
                      src="./food.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Food</p>
                  </div>
                  <div className="col">
                    <img
                      alt="service parking"
                      src="./car.jpg"
                      className="service_img"
                    />
                    <br />
                    <p className="service_title">Car</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="upper__space"></div>
        {/** Map and Calendar */}

        <div className="row">
          <div className="pick_reservation">
            <div className="reservation__map">
              <MapContainer
                center={[51.2277, 6.7735]}
                zoom={13}
                scrollWheelZoom={false}
                tap={false}
                removeOutsideVisibleBounds={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="date__range">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            </div>
          </div>
        </div>

        {/** Reservation details */}
        <div className="upper__space"></div>
        <div className="row ">
          <div className="reservation_details">
            <div className="reservation_details_content">
              <div className="row  dates_reservation">
                <div className="col-6  check-in">
                <div className="p-3">
                    {" "}
                    <p>Check-in</p>
                    <p>21/03/2021</p>
                  </div>
                </div>
                <div className="col-6 check-out">
                  <div className="p-3">
                    {" "}
                    <p>Check-out</p>
                    <p>27/03/2021</p>
                  </div>
                </div>
              </div>
              <div className="row details_row">
                <p>Night Fees :€120</p>
                <p>Services Fees :€60</p>
                <p>Total price :€1200</p>
              </div>
              <div className="row custom-button-reservation-row">
                <button className="btn btn-dark custom-button-reservation">Reserve</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

let DefaultIcon = L.icon({
  iconUrl:
    "https://icon-library.com/images/google-maps-api-icon/google-maps-api-icon-15.jpg",
  iconSize: [32, 35],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default ApartmentDetails;
