import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/Category.css";
import {
  getFiltersHandler,
  getItemsHandler,
  resetItemSuccess,
} from "../3-actions/itemActions";
import BlogsContainer from "./Components/BlogsContainer";
import Nav from "./Components/Nav";

export default function Blog() {
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
      dispatch(getItemsHandler("blog", filtersArray));
      return;
    } else {
      filterDiv.classList.add("active");
      filtersArray = [...filtersSelected, filter.name];
      setFiltersSelected(filtersArray);
      dispatch(getItemsHandler("blog", filtersArray));
    }
  };

  useEffect(() => {
    dispatch(getItemsHandler("blog"));
    dispatch(getFiltersHandler("blog"));

    return () => {
      dispatch(resetItemSuccess());
    };
  }, []);

  return (
    <>
      <div className="category blog">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Blog</h1>
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
          <BlogsContainer items={items} />
        </div>
      </div>
    </>
  );
}
