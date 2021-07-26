import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../../1-css/BlogsContainer.css";
import { getItemsHandler, resetGetItem } from "../../3-actions/itemActions";
import BlogItem from "./BlogItem";
import Pagination from "./Pagination";

export default function BlogsContainer() {
  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 12;
  const offset = page * per_page - per_page;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  useEffect(() => {
    dispatch(getItemsHandler("blog", offset, per_page, filters));
    return () => {
      dispatch(resetGetItem());
    };
  }, [page, filtersParams]);

  return (
    <div className="blogs-container">
      <div className="items-container">
        {items.map((item, i) => (
          <BlogItem item={item} key={i} />
        ))}
      </div>

      {count / per_page > 1 ? (
        <Pagination
          count={count}
          per_page={per_page}
          page={Number(page)}
          filters={filtersParams}
          url={`/blog`}
        />
      ) : null}
    </div>
  );
}
