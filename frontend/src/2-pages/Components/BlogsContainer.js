import React from "react";
import "../../1-css/BlogsContainer.css";
import BlogItem from "./BlogItem";

export default function BlogsContainer({ items }) {
  return (
    <div className="blogs-container">
      {items.map((item, i) => (
        <BlogItem item={item} key={i} />
      ))}
    </div>
  );
}
