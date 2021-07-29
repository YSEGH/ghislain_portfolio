import React from "react";
import "../../1-css/WorkItem.css";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

export default function WorkItem({ item }) {
  return (
    <Link className="work-item">
      <div className="date-container">
        <img src={item.photos[item.photos.length - 1].src} />
        <h1>{item.date.split("/")[2].split("-")[0]}</h1>
      </div>
    </Link>
  );
}
