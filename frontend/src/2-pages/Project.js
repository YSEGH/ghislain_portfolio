import React, { useEffect } from "react";
import "../1-css/Project.css";
import Nav from "./Components/Nav";
import Item from "./Components/Item";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getItemsHandler, resetGetItem } from "../3-actions/itemActions";
import FilterContainer from "./Components/FilterContainer";
import { LoadingSVG } from "./Components/SmallComponents";

export default function Project(props) {
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
    dispatch(getItemsHandler("project", newOffset, per_page, filters));
    props.history.push(
      `/projects/${newPage}/${filtersParams ? filtersParams : ""}`
    );
  };

  useEffect(() => {
    dispatch(getItemsHandler("project", 0, page * per_page, filters));
    return () => {
      dispatch(resetGetItem());
    };
  }, [filtersParams]);

  return (
    <div className="project">
      <Nav />
      <div className="page-content">
        <div className="text-container">
          <FilterContainer content="project" props={props} url={`/projects`} />
        </div>
        <div className="project-container">
          {items
            .reverse()
            .map((item, i) =>
              item.content === "project" ? <Item item={item} /> : null
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
    </div>
  );
}
