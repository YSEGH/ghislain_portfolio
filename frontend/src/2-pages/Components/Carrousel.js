import React, { useEffect, useState } from "react";
import "../../1-css/Carrousel.css";
import { GrNext, GrPrevious } from "react-icons/gr";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../../node_modules/swiper/swiper-bundle.min.css";

const slides = [
  {
    src: "/images/large.jpg",
  },
  {
    src: "/images/KENZO-2.png",
  },
  {
    src: "/images/KOOZA-7.jpg",
  },
];

export default function Carrousel({ classN }) {
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [index, setIndex] = useState(0);

  const mouseDownHandler = (e) => {
    const slider = document.querySelector(".carousel-container");
    setIsDown(true);
    slider.classList.add("active");
    const start = e.pageX - slider.offsetLeft;
    const scrollL = slider.scrollLeft;
    setStartX(start);
    setScrollLeft(scrollL);
  };
  const mouseLeaveHandler = (e) => {
    const slider = document.querySelector(".carousel-container");
    setIsDown(false);
    slider.classList.remove("active");
  };
  const mouseUpHandler = (e) => {
    const slider = document.querySelector(".carousel-container");
    setIsDown(false);
    slider.classList.remove("active");
  };
  const mouseMoveHandler = (e) => {
    const slider = document.querySelector(".carousel-container");
    if (!isDown) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  };

  const nextSlide = () => {
    const slider = document.querySelector(".carousel-container");
    const newIndex = index + 1;
    setIndex(newIndex);
    console.log(document.getElementsByClassName("slide")[0]);
    console.log(
      newIndex * document.getElementsByClassName("slide")[0].offsetWidth
    );
    slider.style.transform = `translateX(-${
      newIndex * document.getElementsByClassName("slide")[0].offsetWidth
    }px)`;
  };

  const prevSlide = () => {
    const slider = document.querySelector(".carousel-container");
    const newIndex = index - 1;
    const translateX = Number(
      slider.style.transform.split("(")[1].split(")")[0].split("px")[0]
    );
    setIndex(newIndex);
    slider.style.transform = `translateX(${
      translateX + document.getElementsByClassName("slide")[0].offsetWidth
    }px)`;
  };

  useEffect(() => {
    return () => {};
  }, [window.innerWidth]);

  return (
    <div className="carousel">
      <div
        className="carousel-container"
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseLeave={(e) => mouseLeaveHandler(e)}
        onMouseUp={(e) => mouseUpHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)}
        style={{
          width:
            window.innerWidth > 960
              ? `${slides.length * (window.innerWidth * 0.65)}px`
              : `${slides.length * window.innerWidth}px`,
        }}
      >
        {slides.map((img, i) => (
          <img className="slide" src={img.src} key={i} />
        ))}
      </div>
      {index + 1 < slides.length && (
        <button className="button-slide next" onClick={() => nextSlide()}>
          {">"}
        </button>
      )}

      {index > 0 && (
        <button className="button-slide prev" onClick={() => prevSlide()}>
          {"<"}
        </button>
      )}
    </div>
  );
}
