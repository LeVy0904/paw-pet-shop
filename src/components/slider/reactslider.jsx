import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./slider.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  const sliderRef = useRef(null);

  const sliderClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const scroll = (direction) => {
    const far = (sliderRef.current.clientWidth / 2) * direction;
    const pos = sliderRef.current.scrollLeft + far;

    sliderRef.current.scroll({
      left: pos,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/v1/product/getAllProducts")
      .then((response) => {
        setSlides(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="slider-container">
      <div id="main-slider-container">
        <MdChevronLeft
          size={40}
          className="slider-icon left"
          onClick={() => scroll(-1)}
        />
        <div id="slider" ref={sliderRef}>
          {slides.map((slide, index) => (
            <div
              className="slider-card"
              key={index}
              onClick={() => sliderClick(slide._id)}
            >
              <div
                className="slider-card-img"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p className="slider-card-title">{slide.title}</p>
              <p className="slider-card-price">
                {slide.price.toLocaleString()} đ
              </p>
            </div>
          ))}
        </div>
        <MdChevronRight
          size={40}
          className="slider-icon right"
          onClick={() => scroll(1)}
        />
      </div>
    </div>
  );
}
