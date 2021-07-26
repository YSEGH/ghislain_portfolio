import React, { useEffect, useRef, useState } from "react";
import "../../1-css/BlogItem.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constants";
import { Link } from "react-router-dom";

export default function BlogItem({ item }) {
  const [text, setText] = useState("");

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
      <Link to={`/blog/article/id/${item._id}`}>
        <img src={item.photos[0].src} alt="blog" />
      </Link>
      <div className="text-container">
        <h2>{item.title}</h2>
        <div className="editor-js-blog-item">
          <EditorJs tools={EDITOR_JS_TOOLS} data={item.description} readOnly />
        </div>
        <span>(...)</span>
        <Link to={`/blog/article/id/${item._id}`}>Lire la suite</Link>
      </div>
    </div>
  );
}
