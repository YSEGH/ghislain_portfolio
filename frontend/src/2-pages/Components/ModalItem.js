import React from "react";
import "../../1-css/ModalItem.css";
import { MdDateRange, MdPlace, MdInfoOutline, MdClose } from "react-icons/md";
import Carrousel from "./Carrousel";

export default function ModalItem({ item }) {
  const closeModal = () => {
    const modalItem = document.getElementsByClassName("modal-item")[0];
    modalItem.classList.add("close");
    modalItem.classList.remove("open");
    console.log(modalItem);
  };

  const showText = () => {
    const text = document.getElementsByClassName("text-container-modal")[0];
    if (text.classList.contains("open")) {
      text.classList.add("close");
      text.classList.remove("open");
    } else {
      text.classList.add("open");
      text.classList.remove("close");
    }
  };

  return (
    <div className="modal-item" onClick={() => closeModal()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
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
          <Carrousel />
        </div>
        <div className="text-container-modal close">
          <h2>{item.name}</h2>
          <p>
            Fugiat laborum incididunt adipisicing exercitation proident ipsum
            sunt. Est sunt magna est magna est esse et in adipisicing eu anim.
            Id nostrud laborum nulla amet duis reprehenderit aliquip. Non
            voluptate dolor Lorem sit minim deserunt nisi anim esse sint veniam
            ea ad. Aute dolor consectetur esse ipsum eiusmod. Eiusmod ullamco ex
            do proident ad exercitation magna occaecat laborum aute ex
            reprehenderit.
          </p>
          <p>
            <span>
              <MdDateRange size={40} />
            </span>
            04/03/2020
          </p>
          <p>
            <span>
              <MdPlace size={40} />
            </span>
            Paris, France
          </p>
        </div>
      </div>
    </div>
  );
}
