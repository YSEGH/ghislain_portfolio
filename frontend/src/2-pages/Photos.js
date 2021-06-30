import React from "react";
import "../1-css/Category.css";
import PhotosContainer from "./Components/PhotosContainer";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";

export default function Photos() {
  return (
    <>
      <div className="category photos">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Photography</h1>
          <ul className="filter-container">
            <li>Asia</li>
            <li>Europe</li>
            <li>USA</li>
            <li>Africa</li>
          </ul>
        </div>
        <PhotosContainer />
      </div>
    </>
  );
}
