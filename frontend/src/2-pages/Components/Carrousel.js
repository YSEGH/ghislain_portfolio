import React, { useEffect, useState } from "react";
import "../../1-css/Carrousel.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ModalPress from "./ModalPress";

const slides = [
  {
    src: "/images/press.png",
  },
  {
    src: "/images/press-2.jpg",
  },
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

export default function Carrousel({ classN, width, category }) {
  const [pressImg, setPressImg] = useState("");
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

  const displayModal = () => {
    const modal = document.getElementsByClassName("modal-item")[0];
    modal.classList.remove("close");
    modal.classList.add("open");
  };

  useEffect(() => {
    return () => {};
  }, [window.innerWidth]);

  return (
    <div className={`carousel ${classN}`}>
      <ModalPress src={pressImg} />
      <div
        className="carousel-container"
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseLeave={(e) => mouseLeaveHandler(e)}
        onMouseUp={(e) => mouseUpHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)}
        style={{
          width: `${slides.length * width}px`,
        }}
      >
        {slides.map((img, i) => (
          <div className="slide" key={i}>
            <img
              src={img.src}
              style={
                classN === "press-carousel"
                  ? { cursor: "zoom-in", pointerEvents: "all" }
                  : {}
              }
              onClick={
                classN === "press-carousel"
                  ? () => {
                      setPressImg(img.src);
                      displayModal();
                    }
                  : null
              }
            />
          </div>
        ))}
      </div>
      {index + 1 < slides.length && (
        <button className="button-slide next" onClick={() => nextSlide()}>
          <MdNavigateNext size={40} />
        </button>
      )}

      {index > 0 && (
        <button className="button-slide prev" onClick={() => prevSlide()}>
          <MdNavigateBefore size={40} />
        </button>
      )}
    </div>
  );
}
