import React from "react";
import FormAddContenu from "./FormAddContenu";
import "../../1-css/ModalContenu.css";
import { MdDateRange, MdPlace, MdInfoOutline, MdClose } from "react-icons/md";

export default function ModalContenu() {
  const closeModal = () => {
    const modalItem = document.querySelector(".modal.contenu");
    modalItem.classList.add("close");
    modalItem.classList.remove("open");
  };
  return (
    <div className="modal contenu" onClick={() => closeModal()}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <FormAddContenu
          update={true}
          item={{ type: "oneFile", categories: [] }}
        />
      </div>
    </div>
  );
}
