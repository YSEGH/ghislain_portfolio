import React, { useEffect } from "react";
import "../../1-css/ModalPress.css";
import { MdClose, MdInfoOutline, MdDateRange, MdPlace } from "react-icons/md";

export default function ModalPress({ item }) {
  const closeModal = () => {
    const modalItem = document.getElementsByClassName("modal")[0];
    modalItem.classList.add("close");
    modalItem.classList.remove("open");
  };

  const zoomModal = () => {
    const photo = document.querySelector(".photo-container img");

    if (photo.classList.contains("zoom-in")) {
      photo.classList.remove("zoom-in");
      photo.classList.add("zoom-out");
      photo.style.zoom = "1";
    } else if (photo.classList.contains("zoom-out")) {
      photo.classList.remove("zoom-out");
      photo.classList.add("zoom-in");
      photo.style.zoom = "1.5";
    }
  };

  const showText = () => {
    const text = document.querySelector(`.modal .modal-body .text-container`);
    if (text.classList.contains("open")) {
      text.classList.add("close");
      text.classList.remove("open");
    } else {
      text.classList.add("open");
      text.classList.remove("close");
    }
  };

  useEffect(() => {
    return () => {};
  }, [item]);

  return (
    <div className="modal press-modal" onClick={() => closeModal()}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <MdInfoOutline
          className="info-icon"
          size={25}
          onClick={() => showText()}
        />
        <div className="photo-container ">
          <img
            className="zoom-out"
            src={item ? item.photos[0].src : ""}
            onClick={() => zoomModal()}
          />
        </div>
        <div className="text-container close">
          <h2>{item ? item.title : ""}</h2>
          <p>{item ? item.legend : ""}</p>
          <p>
            <span>
              <MdDateRange size={40} />
            </span>
            {item ? item.date : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
