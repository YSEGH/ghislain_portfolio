import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../../1-css/PhotosContainer.css";
import { getItemsHandler, resetGetItem } from "../../3-actions/itemActions";
import Item from "./Item";
import Pagination from "./Pagination";

export default function PhotosContainer() {
  const params = useParams();

  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 25;
  const offset = page * per_page - per_page;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  useEffect(() => {
    dispatch(getItemsHandler("photography", offset, per_page, filters));
    return () => {
      dispatch(resetGetItem());
    };
  }, [page, filtersParams]);

  return (
    <div className="photos-container photo">
      {!loadingItems && (
        <>
          <div className="items-container">
            {items.map((item, i) => (
              <Item
                content="photography"
                key={i}
                item={Object.assign(item, { index: i })}
              />
            ))}
          </div>

          {count / per_page > 1 ? (
            <Pagination
              count={count}
              per_page={per_page}
              page={Number(page)}
              filters={filtersParams}
              url={`/photography`}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
