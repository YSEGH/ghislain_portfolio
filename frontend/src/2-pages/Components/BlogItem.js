import React, { useEffect, useRef, useState } from "react";
import "../../1-css/BlogItem.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constants";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";

export default function BlogItem({ item }) {
  const image = item.photos.filter(
    (photo) => photo.type.split("/")[0] !== "video"
  );
  const [text, setText] = useState("");

  useEffect(() => {
    if (item.description.blocks) {
      setText(
        item.description.blocks
          .map((para, i) => {
            return para.data.text.replaceAll("&nbsp;", " ");
          })
          .join(", ")
      );
    }
    return () => {};
  }, [item]);
  return (
    <div className="blog-item">
      <Link to={`/blog/article/id/${item._id}`}>
        {<img src={image[image.length - 1].src} alt={item.title} />}
      </Link>
      <div className="text-container">
        <Link to={`/blog/article/id/${item._id}`}>{item.title}</Link>
        <p>
          <MdDateRange size={22} />
          {item.date}
        </p>
        <div className="editor-js-blog-item">
          <EditorJs tools={EDITOR_JS_TOOLS} data={item.description} readOnly />
        </div>
        <span>(...)</span>
        <Link to={`/blog/article/id/${item._id}`}>Lire la suite</Link>
      </div>
    </div>
  );
}
