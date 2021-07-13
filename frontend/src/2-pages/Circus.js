import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/Category.css";
import { getFiltersHandler, getItemsHandler } from "../3-actions/itemActions";
import CircusContainer from "./Components/CircusContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import { useParams } from "react-router";
import Pagination from "./Components/Pagination";

export default function Circus() {
  const { page = 1 } = useParams();
  const per_page = 1;
  const offset = page * per_page - per_page;

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  const getFilters = useSelector((state) => state.getFilters);
  const { loading: loadingFilters, filters, error: errorFilters } = getFilters;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler("circus", offset, per_page));
    if (page === 1) {
      dispatch(getFiltersHandler("circus"));
    }
    return () => {};
  }, [page]);

  return (
    <>
      <div className="category circus">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Circus</h1>
          {filters.length ? (
            <FilterContainer
              content="circus"
              offset={offset}
              per_page={per_page}
              filters={filters}
            />
          ) : null}
        </div>
        <CircusContainer items={items} />
      </div>
      <Pagination
        count={count}
        per_page={per_page}
        page={Number(page)}
        url={`/circus`}
      />
      <Footer />
    </>
  );
}
