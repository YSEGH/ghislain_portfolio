import React from "react";
import "../../1-css/BlogItem.css";
import ModalBlog from "./ModalBlog";

export default function BlogItem() {
  const displayModal = () => {
    const modal = document.getElementsByClassName("modal-blog")[0];
    modal.classList.remove("close");
    modal.classList.add("open");
  };

  const text =
    "Duis commodo nisi velit velit do do tempor reprehenderit exercitation Lorem. In sit amet ipsum non. Sunt enim cillum elit exercitation in sint esse enim ullamco Lorem dolore do amet sit.";

  return (
    <div className="blog-item">
      <ModalBlog item={{ name: "Blog test" }} />
      <img
        src="/images/photo.jpg"
        alt="blog"
        onClick={() => {
          displayModal();
        }}
      />
      <h2>Title News</h2>
      <p>{text.substring(0, 200)}</p>
      <a
        onClick={() => {
          displayModal();
        }}
      >
        Lire la suite
      </a>
    </div>
  );
}
