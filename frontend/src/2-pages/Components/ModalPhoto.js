import React, { useState } from "react";
import "../../1-css/ModalPhoto.css";
import { MdClose } from "react-icons/md";
import Carrousel from "./Carrousel";

export default function ModalPhoto({ item }) {
  const [close, setClose] = useState(false);

  const closeModal = () => {
    const modalItem = document.getElementsByClassName("modal-item")[0];
    const carousel = document.querySelector(".carousel");
    const slider = document.querySelector(".carousel-container");
    modalItem.classList.add("close");
    modalItem.classList.remove("open");
    setClose(true);
    setTimeout(() => {
      slider.style.transform = `translateX(0px)`;
      setClose(false);
      carousel.scrollLeft = 0;
    }, 750);
  };

  return (
    <div className="modal-item photo" onClick={() => closeModal()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <div className="photo-container">
          <Carrousel
            category="photo"
            classN="modal-photography"
            close={close}
          />
        </div>
      </div>
    </div>
  );
}
