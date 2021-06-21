import React, { useEffect, useState } from "react";
import "../../1-css/Carrousel.css";
import { GrNext, GrPrevious } from "react-icons/gr";

const slides = [
  {
    name: "test-1",
  },
  {
    name: "test-2",
  },
  {
    name: "test-3",
  },
  {
    name: "test-4",
  },
  {
    name: "test-5",
  },
];

export default function Carrousel() {
  const [currentSlide, setCurrentSlide] = useState("slide3");
  const displayModal = (e) => {
    const currentId = currentSlide;
    setCurrentSlide(e.target.id);

    if (e.target.id !== currentId) {
      return;
    }
    console.log("display modal");
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="carrousel">
      {slides.map((slide, i) => (
        <input
          key={i}
          type="radio"
          name="slider"
          id={`s${i + 1}`}
          defaultChecked={i === 3 ? true : false}
        />
      ))}
      {slides.map((slide, i) => (
        <label
          key={i}
          htmlFor={`s${i + 1}`}
          id={`slide${i + 1}`}
          onClick={(e) => displayModal(e)}
        ></label>
      ))}
      {/*       <input type="radio" name="slider" id="s1" />
      <input type="radio" name="slider" id="s2" />
      <input type="radio" name="slider" id="s3" defaultChecked />
      <input type="radio" name="slider" id="s4" />
      <input type="radio" name="slider" id="s5" />
      <label htmlFor="s1" id="slide1"></label>
      <label htmlFor="s2" id="slide2"></label>
      <label htmlFor="s3" id="slide3"></label>
      <label htmlFor="s4" id="slide4"></label>
      <label htmlFor="s5" id="slide5"></label> */}
    </div>
  );
}
