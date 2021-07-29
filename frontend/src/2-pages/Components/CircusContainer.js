import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../../1-css/CircusContainer.css";
import { getItemsHandler, resetGetItem } from "../../3-actions/itemActions";
import Item from "./Item";
import Pagination from "./Pagination";

export default function CircusContainer() {
  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 25;
  const offset = page * per_page - per_page;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  useEffect(() => {
    dispatch(getItemsHandler("circus", offset, per_page, filters));
    return () => {
      dispatch(resetGetItem());
    };
  }, [page, filtersParams]);

  return (
    <div className="circus-container circus">
      {!loadingItems && (
        <>
          <div className="items-container">
            {items
              .reverse()
              .map((item, i) =>
                item.content === "circus" ? (
                  <Item key={i} item={Object.assign(item, { index: i })} />
                ) : null
              )}
          </div>
          {count / per_page > 1 ? (
            <Pagination
              count={count}
              per_page={per_page}
              page={Number(page)}
              filters={filtersParams}
              url={`/circus`}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
