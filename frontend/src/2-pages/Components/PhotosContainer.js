import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../../1-css/PhotosContainer.css";
import { getItemsHandler } from "../../3-actions/itemActions";
import Item from "./Item";
import ModalPhoto from "./ModalPhoto";
import Pagination from "./Pagination";

export default function PhotosContainer() {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 25;
  const offset = page * per_page - per_page;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  useEffect(() => {
    dispatch(getItemsHandler("photography", offset, per_page, filters));
    return () => {};
  }, [page, filtersParams]);

  return (
    <div className="photos-container photo">
      <ModalPhoto items={items} index={index} />

      <div className="items-container">
        {items.map((item, i) => (
          <Item
            key={i}
            item={Object.assign(item, { index: i })}
            secondaryClass={"item-photography"}
            setIndex={setIndex}
            modalSelector={`.modal.photo`}
          />
        ))}
      </div>
      <Pagination
        count={count}
        per_page={per_page}
        page={Number(page)}
        filters={filtersParams}
        url={`/photography`}
      />
    </div>
  );
}
