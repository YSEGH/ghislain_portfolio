import React, { useRef, useState } from "react";
import "../../1-css/ModalCircus.css";
import { MdDateRange, MdPlace, MdInfoOutline, MdClose } from "react-icons/md";
import Carrousel from "./Carrousel";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constants";

export default function ModalCircus({ item }) {
  const [close, setClose] = useState(false);
  const instanceRef = useRef(null);

  const closeModal = () => {
    const modal = document.querySelector(`.modal#modal-${item._id}`);
    const carousel = document.querySelector(
      `.modal#modal-${item._id} .carousel`
    );
    const slider = document.querySelector(
      `.modal#modal-${item._id} .slide-container`
    );
    modal.classList.add("close");
    modal.classList.remove("open");
    setClose(true);
    setTimeout(() => {
      slider.style.transform = `translateX(0px)`;
      setClose(false);
      carousel.scrollLeft = 0;
    }, 750);
  };

  const showText = () => {
    const text = document.querySelector(
      `.modal#modal-${item._id} .text-container`
    );
    if (text.classList.contains("open")) {
      text.classList.add("close");
      text.classList.remove("open");
    } else {
      text.classList.add("open");
      text.classList.remove("close");
    }
  };

  return (
    <div
      className={`modal`}
      id={`modal-${item._id}`}
      onClick={() => closeModal()}
    >
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <MdInfoOutline
          className="info-icon"
          size={25}
          onClick={() => showText()}
        />
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <div className="photo-container">
          <Carrousel
            modalSelector={`.modal#modal-${item._id}`}
            secondaryClass="carousel-circus"
            close={close}
            width={
              window.innerWidth > 1050
                ? window.innerWidth * 0.65
                : window.innerWidth
            }
            slides={item.photos}
          />
        </div>
        <div className="text-container close">
          <h2>{item.title}</h2>
          <div className="editor-js">
            <EditorJs
              instanceRef={(instance) => (instanceRef.current = instance)}
              tools={EDITOR_JS_TOOLS}
              data={item.description}
              readOnly
            />
          </div>
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
    </div>
  );
}
