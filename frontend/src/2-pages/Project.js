import React, { useEffect } from "react";
import "../1-css/Project.css";
import Nav from "./Components/Nav";
import Item from "./Components/Item";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getItemsHandler, resetGetItem } from "../3-actions/itemActions";
import FilterContainer from "./Components/FilterContainer";

export default function Project(props) {
  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 25;
  const offset = page * per_page - per_page;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  useEffect(() => {
    dispatch(getItemsHandler("project", offset, per_page, filters));
    return () => {
      dispatch(resetGetItem());
    };
  }, [page, filtersParams]);

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
      </div>
    </div>
  );
}
