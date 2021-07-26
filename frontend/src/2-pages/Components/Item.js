import React, { useEffect } from "react";
import "../../1-css/Item.css";
import { MdPlayCircleFilled, MdPlace } from "react-icons/md";

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
      {item.photos[item.photos.length - 1].type.split("/")[0] === "image" ? (
        <img src={item.photos[item.photos.length - 1].src} alt={item.title} />
      ) : (
        <video src={item.photos[item.photos.length - 1].src} />
      )}
      <div className="mask"></div>
      <h1 className="item-title">{item.title}</h1>
      <p className="item-place">
        <span>
          <MdPlace size={20} />
        </span>
        {item.place}
      </p>
      {item.photos[item.photos.length - 1].type.split("/")[0] === "video" && (
        <div className="video-button">
          <MdPlayCircleFilled size={80} />
        </div>
      )}
    </div>
  );
}
