import React, { useState } from "react";
import "../../1-css/ModalPhoto.css";
import { MdClose, MdInfoOutline } from "react-icons/md";
import Carrousel from "./Carrousel";

export default function ModalPhoto({ items, index }) {
  const [close, setClose] = useState(false);

  const closeModal = () => {
    const modalItem = document.querySelector(`.modal.photo`);
    modalItem.classList.add("close");
    modalItem.classList.remove("open");
    setClose(true);
    setTimeout(() => {
      modalItem.classList.remove("close");
      setClose(false);
    }, 750);
  };

  return (
    <div className="modal photo" onClick={() => closeModal()}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <div className="photo-container">
          <Carrousel
            modalSelector=".modal.photo"
            secondaryClass="carousel-photography"
            close={close}
            width={window.innerWidth}
            initialIndex={index}
            slides={items.map((item) => {
              return item.photos[0];
            })}
            items={items}
          />
        </div>
      </div>
    </div>
  );
}
