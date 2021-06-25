import React from "react";
import "../1-css/Category.css";
import ItemsContainer from "./Components/ItemsContainer";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";

export default function Category({ category }) {
  return (
    <>
      <div className="category">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>{category}</h1>
          <ul className="filter-container">
            <li>Asia</li>
            <li>Europe</li>
            <li>USA</li>
            <li>Africa</li>
          </ul>
        </div>
        <ItemsContainer />
      </div>
      <Footer />
    </>
  );
}