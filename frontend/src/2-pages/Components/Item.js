import React from "react";
import "../../1-css/Item.css";
import ModalItem from "./ModalItem";

export default function Item() {
  const displayModal = () => {
    const modal = document.getElementsByClassName("modal-item")[0];
    modal.classList.remove("close");
    modal.classList.add("open");
  };

  return (
    <div
      className="item"
      style={{
        backgroundImage: "url(/images/large.jpg)",
      }}
    >
      <ModalItem item={{ name: "test" }} />
      <div
        className="item-hover"
        onClick={() => {
          displayModal();
        }}
      >
        <h2>Circus</h2>
        <p>Legend test</p>
      </div>
    </div>
  );
}
