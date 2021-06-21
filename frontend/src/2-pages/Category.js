import React from "react";
import "../1-css/Category.css";
import ItemsContainer from "./Components/ItemsContainer";
import Nav from "./Components/Nav";

export default function Category() {
  return (
    <div className="category">
      <Nav color={"black"} />
      <div className="text-container">
        <h1>Category name</h1>
        <ul className="filter-container">
          <li>Asia</li>
          <li>Europe</li>
          <li>USA</li>
          <li>Africa</li>
        </ul>
      </div>
      <ItemsContainer />
    </div>
  );
}
