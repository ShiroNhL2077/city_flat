import React from 'react'
import Carousel from "react-bootstrap/Carousel";

function CarouselPage() {
  return (
    <Carousel fade>
    <Carousel.Item>
      <img
        className="d-block w-100 img_size"
        src="./1.jpg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>APARTMENT NAME</h3>
        <p>Description about the house and stuff.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./2.jpg"
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>APARTMENT NAME</h3>
        <p>Description about the house and stuff.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./3.jpg"
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>APARTMENT NAME</h3>
        <p>Description about the house and stuff.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default CarouselPage