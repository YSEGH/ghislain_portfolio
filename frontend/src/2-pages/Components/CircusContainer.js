import React, { useState } from "react";
import "../../1-css/CircusContainer.css";
import Item from "./Item";

export default function CircusContainer() {
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
    {
      name: "test6",
    },
  ];

  return (
    <div className="items-container circus">
      {text.map((item, i) => (
        <Item category="circus" key={i} />
      ))}
    </div>
  );
}
