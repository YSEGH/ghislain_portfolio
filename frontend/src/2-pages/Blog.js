import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/Category.css";
import {
  getFiltersHandler,
  getItemsHandler,
  resetItemSuccess,
} from "../3-actions/itemActions";
import BlogsContainer from "./Components/BlogsContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";

export default function Blog() {
  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, error: errorItems } = getItem;

  const getFilters = useSelector((state) => state.getFilters);
  const { loading: loadingFilters, filters, error: errorFilters } = getFilters;

  const dispatch = useDispatch();

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
          <FilterContainer content="blog" filters={filters} />
        </div>
        <BlogsContainer items={items} />
      </div>
    </>
  );
}
