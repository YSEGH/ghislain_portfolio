import React, { useEffect, useRef, useState } from "react";
import "../../1-css/BlogItem.css";
import ModalBlog from "./ModalBlog";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constants";

export default function BlogItem({ item }) {
  const [text, setText] = useState("");
  const instanceRef = useRef(null);

  const displayModal = () => {
    const modal = document.querySelector(`.modal-blog#modal-${item._id}`);
    modal.classList.remove("close");
    modal.classList.add("open");
  };

  useEffect(() => {
    setText(
      item.description.blocks
        .map((para, i) => {
          return para.data.text.replaceAll("&nbsp;", " ");
        })
        .join(", ")
    );
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
      <div className="editor-js">
        <EditorJs
          instanceRef={(instance) => (instanceRef.current = instance)}
          tools={EDITOR_JS_TOOLS}
          data={item.description}
          readOnly
        />
      </div>
      <span>(...)</span>
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
