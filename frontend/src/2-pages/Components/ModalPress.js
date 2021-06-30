import React from "react";
import "../../1-css/ModalPress.css";
import { MdClose } from "react-icons/md";

export default function ModalPress({ src }) {
  const closeModal = () => {
    const modalItem = document.getElementsByClassName("modal-item")[0];
    modalItem.classList.add("close");
    modalItem.classList.remove("open");
  };

  return (
    <div className="modal-item press-modal" onClick={() => closeModal()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <div className="photo-container">
          <img src={src} />
        </div>
      </div>
    </div>
  );
}
