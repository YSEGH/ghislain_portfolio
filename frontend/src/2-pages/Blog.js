import React from "react";
import "../1-css/Blog.css";
import BlogsContainer from "./Components/BlogsContainer";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";

export default function Blog() {
  return (
    <>
      <div className="blog">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Blog</h1>
          <ul className="filter-container">
            <li>Asia</li>
            <li>Europe</li>
            <li>USA</li>
            <li>Africa</li>
          </ul>
          <BlogsContainer />
        </div>
      </div>
      <Footer />
    </>
  );
}
