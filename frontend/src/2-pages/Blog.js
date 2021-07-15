import React from "react";
import "../1-css/Category.css";
import BlogsContainer from "./Components/BlogsContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

export default function Blog(props) {
  return (
    <>
      <div className="category blog">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Blog</h1>
          <FilterContainer content="blog" props={props} url={`/blog`} />
        </div>
        <BlogsContainer />
      </div>

      <Footer />
    </>
  );
}
