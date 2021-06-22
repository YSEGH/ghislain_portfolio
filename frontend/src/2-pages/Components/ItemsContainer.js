import React, { useState } from "react";
import "../../1-css/ItemsContainer.css";
import Item from "./Item";
import ModalItem from "./ModalItem";

export default function ItemsContainer() {
  const text = [
    {
      name: "test1",
    },
    {
      name: "test2",
    },
    {
      name: "test3",
    },
    {
      name: "test4",
    },
    {
      name: "test5",
    },
  ];

  return (
    <div className="items-container">
      {text.map((item, i) => (
        <Item key={i} />
      ))}
    </div>
  );
}
