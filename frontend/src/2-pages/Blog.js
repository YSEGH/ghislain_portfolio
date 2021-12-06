import React, { useEffect } from "react";
import "../1-css/Category.css";
import BlogsContainer from "./Components/BlogsContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";
import Title from "./Components/Title";

export default function Blog(props) {
  useEffect(() => {
    document.title = "Ghislain Ramage - Blog";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Want to know more about my news ? This is where it happens."
      );
    return () => {};
  }, []);
  return (
    <>
      <div className="category blog">
        <Nav />
        <div className="page-content">
          <Title title="Blog" />
          <div className="text-container">
            <FilterContainer content="blog" props={props} url={`/blog`} />
          </div>
          <BlogsContainer props={props} />
        </div>
      </div>
    </>
  );
}
