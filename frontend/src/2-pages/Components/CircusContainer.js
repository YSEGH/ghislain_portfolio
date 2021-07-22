import React, { useEffect, useState, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../../1-css/CircusContainer.css";
import { getItemsHandler } from "../../3-actions/itemActions";
import Item from "./Item";
const ModalCircus = lazy(() => import("./ModalCircus"));
import Pagination from "./Pagination";

export default function CircusContainer() {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 6;
  const offset = page * per_page - per_page;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  useEffect(() => {
    dispatch(getItemsHandler("circus", offset, per_page, filters));
    return () => {};
  }, [page, filtersParams]);

  return (
    <div className="circus-container circus">
      <ModalCircus items={items} index={index} />
      <div className="items-container">
        {items.map((item, i) => (
          <Item
            key={i}
            item={Object.assign(item, { index: i })}
            setIndex={setIndex}
            secondaryClass={"item-circus"}
            modalSelector={`.modal.circus`}
          />
        ))}
      </div>
      <Pagination
        count={count}
        per_page={per_page}
        page={Number(page)}
        filters={filtersParams}
        url={`/circus`}
      />
    </div>
  );
}
