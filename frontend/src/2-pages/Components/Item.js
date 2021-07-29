import React, { useEffect } from "react";
import "../../1-css/Item.css";
import { MdPlace, MdDateRange, MdWork } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Item({ secondaryClass, item = {} }) {
  const image = item.photos.filter(
    (photo) => photo.type.split("/")[0] !== "video"
  );

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Link className={`item ${item.content}`} to={`/details/${item._id}`}>
      {<img src={image[image.length - 1].src} alt={item.title} />}
      <div className="mask"></div>
      <h1 className="item-title">
        {item.title}
        {item.content === "circus" && item.subtitle && (
          <span> - {item.subtitle}</span>
        )}
      </h1>
      {item.content === "project" && (
        <p className="item-date">
          <span>
            <MdDateRange size={20} />
          </span>
          {item.date}
        </p>
      )}
      {/* {item.content === "work" && (
        <p className="item-subtitle">
          <span>
            <MdWork size={20} />
          </span>
          {item.subtitle}
        </p>
      )} */}
      {(item.content === "circus" || item.content === "photography") && (
        <p className="item-place">
          <span>
            <IoEarthOutline size={20} />
          </span>
          {item.place}
        </p>
      )}
    </Link>
  );
}
