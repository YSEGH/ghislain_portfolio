import React, { useEffect, useState } from "react";
import "../../1-css/Item.css";
import ModalCircus from "./ModalCircus";

export default function Item({
  secondaryClass,
  item = {},
  setIndex,
  modalSelector,
}) {
  const displayModal = () => {
    const modal = document.querySelector(`${modalSelector}`);
    modal.classList.remove("close");
    modal.classList.add("open");
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      className={`item ${secondaryClass}`}
      style={{
        backgroundImage: `url(${item.photos[0].src})`,
      }}
      onClick={() => {
        if (item.content !== "blog") {
          setIndex(item.index);
        }
        displayModal();
      }}
    ></div>
  );
}
