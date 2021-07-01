import React from "react";
import "../1-css/Category.css";
import CircusContainer from "./Components/CircusContainer";
import Nav from "./Components/Nav";

export default function Circus() {
  return (
    <>
      <div className="category circus">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Circus</h1>
          <ul className="filter-container">
            <li>Asia</li>
            <li>Europe</li>
            <li>USA</li>
            <li>Africa</li>
          </ul>
        </div>
        <CircusContainer />
      </div>
    </>
  );
}
