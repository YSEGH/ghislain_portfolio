import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../../1-css/BlogsContainer.css";
import { getItemsHandler, resetGetItem } from "../../3-actions/itemActions";
import BlogItem from "./BlogItem";
import { LoadingSVG } from "./SmallComponents";

export default function BlogsContainer({ props }) {
  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 6;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  const showMore = (e) => {
    e.preventDefault();
    let newPage = Number(page) + 1;
    let newOffset = newPage * per_page - per_page;
    dispatch(getItemsHandler("blog", newOffset, per_page, filters));
    props.history.push(
      `/blog/${newPage}/${filtersParams ? filtersParams : ""}`
    );
  };

  useEffect(() => {
    dispatch(getItemsHandler("blog", 0, page * per_page, filters));
    return () => {
      dispatch(resetGetItem());
    };
  }, [filtersParams]);

  return (
    <div className="blogs-container">
      <div className="items-container">
        {items.map((item, i) =>
          item.content === "blog" ? <BlogItem item={item} key={i} /> : null
        )}
      </div>

      {count > items.length ? (
        <div className={"show-more-button"}>
          <button onClick={(e) => showMore(e)}>
            {loadingItems ? <LoadingSVG /> : "Show more"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
