import React, { useEffect, useState } from "react";
import "../1-css/Category.css";
import { useDispatch, useSelector } from "react-redux";
import PhotosContainer from "./Components/PhotosContainer";
import {
  getFiltersHandler,
  getItemsHandler,
  resetItemSuccess,
} from "../3-actions/itemActions";
import Nav from "./Components/Nav";

export default function Photos() {
  const [filtersSelected, setFiltersSelected] = useState([]);
  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, error: errorItems } = getItem;

  const getFilters = useSelector((state) => state.getFilters);
  const { loading: loadingFilters, filters, error: errorFilters } = getFilters;

  const dispatch = useDispatch();

  const selectFilterHandler = (filter) => {
    const filterDiv = document.querySelector(
      `.filter-container li a.filter-${filter.name}`
    );
    let filtersArray;
    let filterExist = filtersSelected.find((x) => x === filter.name);

    if (filterExist) {
      filterDiv.classList.remove("active");
      filtersArray = filtersSelected.filter((x) => x !== filter.name);
      setFiltersSelected(filtersArray);
      dispatch(getItemsHandler("photography", filtersArray));
      return;
    } else {
      filterDiv.classList.add("active");
      filtersArray = [...filtersSelected, filter.name];
      setFiltersSelected(filtersArray);
      dispatch(getItemsHandler("photography", filtersArray));
    }
  };

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
          <ul className="filter-container">
            {filters.map((filter, i) => (
              <li key={i}>
                <a
                  className={`filter-${filter.name}`}
                  onClick={() => selectFilterHandler(filter)}
                >
                  {filter.name} ({filter.qty})
                </a>
              </li>
            ))}
          </ul>
        </div>
        <PhotosContainer items={items} />
      </div>
    </>
  );
}
