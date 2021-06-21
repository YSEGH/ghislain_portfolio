import React from "react";
import "../../1-css/Item.css";

export default function Item() {
  return (
    <div
      className="item"
      style={{
        backgroundImage: "url(/images/photo.jpg)",
      }}
    >
      <div className="item-hover">
        <h2>Circus</h2>
        <p>Legend test</p>
      </div>
    </div>
  );
}
