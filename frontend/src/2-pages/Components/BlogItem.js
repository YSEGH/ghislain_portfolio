import React, { useEffect, useState } from "react";
import "../../1-css/BlogItem.css";
import ModalBlog from "./ModalBlog";

export default function BlogItem({ item }) {
  const [text, setText] = useState(
    item.description.blocks
      .map((para, i) => {
        return para.data.text;
      })
      .join(", ")
  );

  const displayModal = () => {
    const modal = document.querySelector(`.modal-blog#modal-${item._id}`);
    modal.classList.remove("close");
    modal.classList.add("open");
  };

  useEffect(() => {
    console.log(item.description);
    console.log(text);
    return () => {};
  }, []);
  return (
    <div className="blog-item">
      <ModalBlog item={item} />
      <img
        src={item.photos[0].src}
        alt="blog"
        onClick={() => {
          displayModal();
        }}
      />
      <h2>{item.title}</h2>
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
