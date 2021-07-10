import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/Category.css";
import {
  getFiltersHandler,
  getItemsHandler,
  resetItemSuccess,
} from "../3-actions/itemActions";
import CircusContainer from "./Components/CircusContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";

export default function Circus() {
  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, error: errorItems } = getItem;

  const getFilters = useSelector((state) => state.getFilters);
  const { loading: loadingFilters, filters, error: errorFilters } = getFilters;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler("circus"));
    dispatch(getFiltersHandler("circus"));
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
          <FilterContainer content="circus" filters={filters} />
        </div>
        <CircusContainer items={items} />
      </div>
    </>
  );
}
