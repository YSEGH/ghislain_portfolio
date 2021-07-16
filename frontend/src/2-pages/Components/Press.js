import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../1-css/Press.css";
import { getItemsHandler } from "../../3-actions/itemActions";
import Carousel3d from "./Carousel3d";

export default function Press() {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const dispatch = useDispatch();

  const displayModal = (target) => {
    console.log(target);
  };
  useEffect(() => {
    dispatch(getItemsHandler("press", null, null, null, null));
    return () => {};
  }, []);

  return (
    <div className="press part">
      <div className="text-container">
        <h1>They talk about me</h1>
        <p>Let’s see what people think of me.</p>
      </div>
      {items.length && (
        <Carousel3d
          slides={items.map((item, i) => {
            return item.photos[0];
          })}
          displayModal={displayModal}
        />
      )}
    </div>
  );
}
