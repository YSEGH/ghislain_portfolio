import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/Category.css";
import { getFiltersHandler, getItemsHandler } from "../3-actions/itemActions";
import BlogsContainer from "./Components/BlogsContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import { useParams } from "react-router";
import Pagination from "./Components/Pagination";

export default function Blog(props) {
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 2;
  const offset = page * per_page - per_page;

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  const getFilters = useSelector((state) => state.getFilters);
  const { loading: loadingFilters, filters, error: errorFilters } = getFilters;

  const dispatch = useDispatch();

  useEffect(() => {
    if (filtersParams) {
      console.log(JSON.parse(filtersParams));
    }
    dispatch(
      getItemsHandler("blog", offset, per_page, JSON.parse(filtersParams))
    );
    dispatch(getFiltersHandler("blog"));
    return () => {};
  }, [page, filtersParams]);

  return (
    <>
      <div className="category blog">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Blog</h1>
          {filters.length ? (
            <FilterContainer
              props={props}
              content="blog"
              offset={offset}
              url={`/blog`}
              per_page={per_page}
              filters={filters}
            />
          ) : null}
        </div>
        <BlogsContainer items={items} />
      </div>
      <Pagination
        count={count}
        per_page={per_page}
        page={Number(page)}
        filters={filtersParams}
        url={`/blog`}
      />
      <Footer />
    </>
  );
}
