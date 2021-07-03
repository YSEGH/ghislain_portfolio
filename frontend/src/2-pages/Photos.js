import React, { useEffect } from "react";
import "../1-css/Category.css";
import { useDispatch, useSelector } from "react-redux";
import PhotosContainer from "./Components/PhotosContainer";
import { getItemsHandler, resetItemSuccess } from "../3-actions/itemActions";
import Nav from "./Components/Nav";

export default function Photos() {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler("photography"));
    return () => {
      dispatch(resetItemSuccess());
    };
  }, []);

  return (
    <>
      <div className="category photos">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Photography</h1>
          <ul className="filter-container">
            <li>Asia</li>
            <li>Europe</li>
            <li>USA</li>
            <li>Africa</li>
          </ul>
        </div>
        <PhotosContainer items={items} />
      </div>
    </>
  );
}
