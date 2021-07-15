import React from "react";
import "../1-css/Category.css";
import CircusContainer from "./Components/CircusContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

export default function Circus(props) {
  return (
    <>
      <div className="category circus">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Circus</h1>
          <FilterContainer content="circus" props={props} url={`/circus`} />
        </div>
        <CircusContainer />
      </div>

      <Footer />
    </>
  );
}
