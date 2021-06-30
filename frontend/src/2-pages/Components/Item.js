import React from "react";
import "../../1-css/Item.css";
import ModalCircus from "./ModalCircus";
import ModalPhoto from "./ModalPhoto";

export default function Item({ category }) {
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
      onClick={() => {
        displayModal();
      }}
    >
      {category === "circus" ? (
        <ModalCircus item={{ name: "test" }} />
      ) : (
        <ModalPhoto item={{ name: "test" }} />
      )}

      {category !== "photo" && (
        <div
          className="item-hover"
          onClick={() => {
            displayModal();
          }}
        >
          <h2>Circus</h2>
          <p>Legend test</p>
        </div>
      )}
    </div>
  );
}
