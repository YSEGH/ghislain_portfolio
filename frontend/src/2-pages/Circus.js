import React from "react";
import "../1-css/Category.css";
import CircusContainer from "./Components/CircusContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";

export default function Circus(props) {
  return (
    <>
      <div className="category circus">
        <Nav />
        <div className="page-content">
          <div className="text-container">
            <FilterContainer content="circus" props={props} url={`/circus`} />
          </div>
          <CircusContainer props={props} />
        </div>
      </div>
    </>
  );
}
