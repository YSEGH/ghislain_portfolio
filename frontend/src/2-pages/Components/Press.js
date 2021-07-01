import React from "react";
import "../../1-css/Press.css";
import Carrousel from "./Carrousel";

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

export default function Press() {
  return (
    <div className="press">
      <div className="text-container">
        <h1>They talk about me</h1>
        <p>
          Et ullamco dolore ipsum culpa amet consequat exercitation. Et ullamco
          dolore ipsum culpa amet consequat exercitation.
        </p>
      </div>
      <div className="press-review-container">
        <div className="item-review">
          <h2>Spectacle magnifique et moderne ! </h2>
          <p>Les échos</p>
        </div>
      </div>
    </div>
  );
}
