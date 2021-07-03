import React from "react";
import "../../1-css/CircusContainer.css";
import Item from "./Item";

export default function CircusContainer({ items }) {
  return (
    <div className="items-container circus">
      {items.map((item, i) => (
        <Item
          category="circus"
          key={i}
          item={Object.assign(item, { index: i })}
          secondaryClass={"item-circus"}
          modalSelector={`.modal#modal-${item._id}`}
        />
      ))}
    </div>
  );
}
