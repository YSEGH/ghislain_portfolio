import React, { useEffect } from "react";
import "../1-css/Category.css";
import { useDispatch, useSelector } from "react-redux";
import PhotosContainer from "./Components/PhotosContainer";
import {
  getFiltersHandler,
  getItemsHandler,
  resetItemSuccess,
} from "../3-actions/itemActions";
import Nav from "./Components/Nav";
import FilterContainer from "./Components/FilterContainer";

export default function Photos() {
  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, error: errorItems } = getItem;

  const getFilters = useSelector((state) => state.getFilters);
  const { loading: loadingFilters, filters, error: errorFilters } = getFilters;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler("photography"));
    dispatch(getFiltersHandler("photography"));
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
          {filters.length ? (
            <FilterContainer content="photography" filters={filters} />
          ) : null}
        </div>
        <PhotosContainer items={items} />
      </div>
    </>
  );
}
