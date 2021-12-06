import React from "react";
import "../1-css/Category.css";
import PhotosContainer from "./Components/PhotosContainer";
import Nav from "./Components/Nav";
import FilterContainer from "./Components/FilterContainer";
import Title from "./Components/Title";

export default function Photos(props) {
  return (
    <>
      <div className="category photos">
        <Nav />
        <div className="page-content">
          <Title title="Photography" />
          <div className="text-container">
            <FilterContainer
              content="photography"
              props={props}
              url={`/photography`}
            />
          </div>
          <PhotosContainer props={props} />
        </div>
      </div>
    </>
  );
}
