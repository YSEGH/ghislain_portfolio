import React, { useEffect } from "react";
import "../../1-css/Item.css";
import { MdPlayCircleFilled, MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Item({ secondaryClass, item = {} }) {
  const image = item.photos.filter(
    (photo) => photo.type.split("/")[0] !== "video"
  );

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Link className={`item`} to={`/details/${item._id}`}>
      {<img src={image[image.length - 1].src} alt={item.title} />}
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
    </Link>
  );
}
