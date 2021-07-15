import React, { useState } from "react";
import "../../1-css/ModalCircus.css";
import { MdClose } from "react-icons/md";
import Carrousel from "./Carrousel";

export default function ModalCircus({ items, index }) {
  const [close, setClose] = useState(false);

  const closeModal = () => {
    const modalItem = document.querySelector(`.modal.circus`);
    modalItem.classList.add("close");
    modalItem.classList.remove("open");
    setClose(true);
    setTimeout(() => {
      modalItem.classList.remove("close");
      setClose(false);
    }, 750);
  };

  return (
    <div className={`modal circus`} onClick={() => closeModal()}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <div className="photo-container">
          <Carrousel
            modalSelector={`.modal.circus`}
            secondaryClass="carousel-circus"
            close={close}
            width={window.innerWidth}
            initialIndex={index}
            slides={items.map((item) => {
              console.log(item.photos[0]);
              return item.photos[0];
            })}
            items={items}
          />
        </div>
      </div>
    </div>
  );
}
