import React, { useEffect } from "react";
import "../../1-css/AgendaItem.css";
import { MdDateRange, MdPlace } from "react-icons/md";

export default function AgendaItem({ item }) {
  return (
    <div className="agenda-item">
      <div className="date-container">
        <img src={item.photos[item.photos.length - 1].src} />
        <h1>{item.date.split("/")[2].split("-")[0]}</h1>
      </div>
      <div className="text-container">
        <h1>
          {item.title} <span>- {item.subtitle}</span>
        </h1>
        <p>{!item.description.blocks ? item.description : ""}</p>
        <p>
          <MdDateRange size={30} />
          {item.date}
        </p>
        <p>
          <MdPlace size={30} />
          {item.place}
        </p>
      </div>
    </div>
  );
}
