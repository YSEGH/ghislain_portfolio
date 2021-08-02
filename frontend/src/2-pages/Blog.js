import React from "react";
import "../1-css/Category.css";
import BlogsContainer from "./Components/BlogsContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";

export default function Blog(props) {
  return (
    <>
      <div className="category blog">
        <Nav />
        <div className="page-content">
          <div className="text-container">
            <FilterContainer content="blog" props={props} url={`/blog`} />
          </div>
          <BlogsContainer props={props} />
        </div>
      </div>
    </>
  );
}
