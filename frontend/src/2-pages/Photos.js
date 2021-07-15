import React from "react";
import "../1-css/Category.css";
import PhotosContainer from "./Components/PhotosContainer";
import Nav from "./Components/Nav";
import FilterContainer from "./Components/FilterContainer";
import Footer from "./Components/Footer";

export default function Photos(props) {
  return (
    <>
      <div className="category photos">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Photography</h1>
          <FilterContainer
            content="photography"
            props={props}
            url={`/photography`}
          />
        </div>
        <PhotosContainer />
      </div>
      <Footer />
    </>
  );
}
