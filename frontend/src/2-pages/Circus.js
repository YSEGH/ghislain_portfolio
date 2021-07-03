import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/Category.css";
import { getItemsHandler, resetItemSuccess } from "../3-actions/itemActions";
import CircusContainer from "./Components/CircusContainer";
import Nav from "./Components/Nav";

export default function Circus() {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler("circus"));
    return () => {
      dispatch(resetItemSuccess());
    };
  }, []);

  return (
    <>
      <div className="category circus">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Circus</h1>
          <ul className="filter-container">
            <li>Asia</li>
            <li>Europe</li>
            <li>USA</li>
            <li>Africa</li>
          </ul>
        </div>
        <CircusContainer items={items} />
      </div>
    </>
  );
}
