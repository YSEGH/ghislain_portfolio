import React from "react";
import "../../1-css/BlogsContainer.css";
import BlogItem from "./BlogItem";

export default function BlogsContainer() {
  return (
    <div className="blogs-container">
      <BlogItem />
      <BlogItem />
      <BlogItem />
    </div>
  );
}
