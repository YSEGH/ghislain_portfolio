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
import Footer from "./Components/Footer";
import { useParams } from "react-router";
import Pagination from "./Components/Pagination";

export default function Photos() {
  const { page = 1 } = useParams();
  const per_page = 10;
  const offset = page * per_page - per_page;

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  const getFilters = useSelector((state) => state.getFilters);
  const { loading: loadingFilters, filters, error: errorFilters } = getFilters;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler("photography", offset, per_page));
    dispatch(getFiltersHandler("photography"));
    return () => {};
  }, [page]);

  return (
    <>
      <div className="category photos">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Photography</h1>
          {filters.length ? (
            <FilterContainer
              content="photography"
              offset={offset}
              per_page={per_page}
              filters={filters}
            />
          ) : null}
        </div>
        <PhotosContainer items={items} />
      </div>
      <Pagination
        count={count}
        per_page={per_page}
        page={Number(page)}
        url={`/photography`}
      />
      <Footer />
    </>
  );
}
