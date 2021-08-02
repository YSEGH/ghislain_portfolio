import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../../1-css/CircusContainer.css";
import { getItemsHandler, resetGetItem } from "../../3-actions/itemActions";
import Item from "./Item";
import { LoadingSVG } from "./SmallComponents";

export default function CircusContainer({ props }) {
  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 12;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  const showMore = (e) => {
    e.preventDefault();
    let newPage = Number(page) + 1;
    let newOffset = newPage * per_page - per_page;
    dispatch(getItemsHandler("circus", newOffset, per_page, filters));
    props.history.push(
      `/circus/${newPage}/${filtersParams ? filtersParams : ""}`
    );
  };

  useEffect(() => {
    dispatch(getItemsHandler("circus", 0, page * per_page, filters));
    return () => {
      dispatch(resetGetItem());
    };
  }, [filtersParams]);

  return (
    <div className="circus-container circus">
      <div className="items-container">
        {items
          .reverse()
          .map((item, i) =>
            item.content === "circus" ? (
              <Item key={i} item={Object.assign(item, { index: i })} />
            ) : null
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
