import React, { useState } from "react";
import "../../1-css/PhotosContainer.css";
import Item from "./Item";
import ModalPhoto from "./ModalPhoto";

export default function PhotosContainer({ items }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="items-container photo">
      <ModalPhoto items={items} index={index} />

      {items.map((item, i) => (
        <Item
          category="photo"
          key={i}
          item={Object.assign(item, { index: i })}
          secondaryClass={"item-photography"}
          setIndex={setIndex}
          modalSelector={`.modal.photo`}
        />
      ))}
    </div>
  );
}
