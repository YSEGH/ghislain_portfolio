import React from "react";
import "../../1-css/ModalPhoto.css";
import { MdClose } from "react-icons/md";
import Carrousel from "./Carrousel";

export default function ModalPhoto({ item }) {
  const closeModal = () => {
    const modalItem = document.getElementsByClassName("modal-item")[0];
    modalItem.classList.add("close");
    modalItem.classList.remove("open");
    setTimeout(() => {
      const slider = document.querySelector(".carousel");
      slider.scrollLeft = 0;
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
          <Carrousel category="photo" />
        </div>
      </div>
    </div>
  );
}
