import React, { useEffect, useState } from "react";
import "../../1-css/Carrousel.css";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdDateRange,
  MdPlace,
  MdInfoOutline,
} from "react-icons/md";

export default function Carrousel({
  modalSelector,
  width,
  slides,
  secondaryClass,
  initialIndex = 0,
  items = [],
  close,
}) {
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [index, setIndex] = useState(initialIndex);

  const mouseDownHandler = (e) => {
    const slider = document.querySelector(`${modalSelector} .slide-container`);
    setIsDown(true);
    slider.classList.add("active");
    const start = e.pageX - slider.offsetLeft;
    const scrollL = slider.scrollLeft;
    setStartX(start);
    setScrollLeft(scrollL);
  };
  const mouseLeaveHandler = (e) => {
    const slider = document.querySelector(`${modalSelector} .slide-container`);
    setIsDown(false);
    slider.classList.remove("active");
  };
  const mouseUpHandler = (e) => {
    const slider = document.querySelector(`${modalSelector} .slide-container`);
    setIsDown(false);
    slider.classList.remove("active");
  };
  const mouseMoveHandler = (e) => {
    const slider = document.querySelector(`${modalSelector} .slide-container`);
    if (!isDown) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  };

  const nextSlide = () => {
    const text = document.querySelector(
      `${modalSelector} .carousel [id=slide-${index}] .text-container`
    );
    showText(index);
    if (text.classList.contains("open")) {
      text.classList.add("close");
      text.classList.remove("open");
    }
    const slider = document.querySelector(`${modalSelector} .slide-container`);
    const newIndex = index + 1;
    setIndex(newIndex);
    slider.style.transform = `translateX(-${newIndex * width}px)`;
  };

  const prevSlide = () => {
    const text = document.querySelector(
      `${modalSelector} .carousel [id=slide-${index}] .text-container`
    );
    showText(index);
    if (text.classList.contains("open")) {
      text.classList.add("close");
      text.classList.remove("open");
    }
    const slider = document.querySelector(`${modalSelector} .slide-container`);
    const newIndex = index - 1;
    const translateX = Number(
      slider.style.transform.split("(")[1].split(")")[0].split("px")[0]
    );
    setIndex(newIndex);
    slider.style.transform = `translateX(${translateX + width}px)`;
  };

  const showText = (index) => {
    const text = document.querySelector(
      `${modalSelector} .carousel [id=slide-${index}] .text-container`
    );
    if (text.classList.contains("open")) {
      text.classList.add("close");
      text.classList.remove("open");
    } else {
      text.classList.add("open");
      text.classList.remove("close");
    }
  };

  useEffect(() => {
    const carousel = document.querySelector(`${modalSelector} .carousel`);
    const slider = document.querySelector(`${modalSelector} .slide-container`);
    const newIndex = initialIndex;
    setIndex(newIndex);

    if (window.innerWidth > 1050) {
      slider.style.transform = `translateX(-${newIndex * width}px)`;
    } else {
      carousel.scrollLeft = newIndex * width;
    }

    if (close) {
      setIndex(0);
    }
    return () => {};
  }, [close, initialIndex]);

  return (
    <div className={`carousel ${secondaryClass}`}>
      <div
        className={`slide-container`}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseLeave={(e) => mouseLeaveHandler(e)}
        onMouseUp={(e) => mouseUpHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)}
      >
        {slides.map((img, i) => (
          <div
            className="slide"
            id={`slide-${i}`}
            key={i}
            style={{ width: width }}
          >
            <MdInfoOutline
              className="info-icon"
              size={25}
              onClick={() => showText(i)}
            />
            <div className="text-container close">
              <h2>{items[i].title}</h2>
              <p>{items[i].legend}</p>
              <p>
                <span>
                  <MdDateRange size={40} />
                </span>
                {items[i].date}
              </p>
              <p>
                <span>
                  <MdPlace size={40} />
                </span>
                {items[i].place}
              </p>
            </div>
            {img.type.split("/")[0] === "image" ? (
              <img src={img.src} />
            ) : (
              <video src={img.src} controls />
            )}
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
