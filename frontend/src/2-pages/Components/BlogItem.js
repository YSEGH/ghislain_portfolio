import React from "react";
import "../../1-css/BlogItem.css";

export default function BlogItem() {
  const text =
    "Duis commodo nisi velit velit do do tempor reprehenderit exercitation Lorem. In sit amet ipsum non. Sunt enim cillum elit exercitation in sint esse enim ullamco Lorem dolore do amet sit.";

  return (
    <div className="blog-item">
      <img src="/images/photo.jpg" alt="blog" />
      <h2>Title News</h2>
      <p>{text.substring(0, 200)}</p>
      <a>Lire la suite</a>
    </div>
  );
}
