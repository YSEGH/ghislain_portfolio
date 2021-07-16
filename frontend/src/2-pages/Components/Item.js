import React, { useEffect } from "react";
import "../../1-css/Item.css";
import { MdPlayCircleFilled } from "react-icons/md";

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
      onClick={() => {
        if (item.content !== "blog") {
          setIndex(item.index);
        }
        displayModal();
      }}
    >
      {item.photos[0].type.split("/")[0] === "image" ? (
        <img src={item.photos[0].src} />
      ) : (
        <video src={item.photos[0].src} />
      )}
      {item.photos[0].type.split("/")[0] === "video" && (
        <div className="video-button">
          <MdPlayCircleFilled size={80} />
        </div>
      )}
    </div>
  );
}
