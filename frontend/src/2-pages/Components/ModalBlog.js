import React, { useEffect, useRef } from "react";
import "../../1-css/ModalBlog.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constants";

import { MdDateRange, MdPlace, MdInfoOutline, MdClose } from "react-icons/md";

export default function ModalBlog({ item }) {
  const instanceRef = useRef(null);

  const closeModal = () => {
    const modalItem = document.querySelector(`.modal-blog#modal-${item._id}`);

    modalItem.classList.add("close");
    modalItem.classList.remove("open");
  };

  useEffect(() => {
    console.log(item.description);
    return () => {};
  }, []);

  return (
    <div
      className="modal-blog"
      id={`modal-${item._id}`}
      onClick={() => closeModal()}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <div className="photo-container">
          <img src={item.photos[0].src} alt={item.legend} />
          <div className="details-infos photo">
            <p>
              <span>
                <MdDateRange size={40} />
              </span>
              {item.date}
            </p>
            <p>
              <span>
                <MdPlace size={40} />
              </span>
              {item.place}
            </p>
          </div>
        </div>
        <div className="text-container close">
          <div className="details-infos text">
            <p>
              <span>
                <MdDateRange size={40} />
              </span>
              {item.date}
            </p>
            <p>
              <span>
                <MdPlace size={40} />
              </span>
              {item.place}
            </p>
          </div>
          <h2>{item.title}</h2>
          <div className="editor-js">
            <EditorJs
              instanceRef={(instance) => (instanceRef.current = instance)}
              tools={EDITOR_JS_TOOLS}
              data={item.description}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
