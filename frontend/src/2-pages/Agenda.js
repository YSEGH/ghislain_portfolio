import React, { useEffect } from "react";
import "../1-css/Agenda.css";
import Nav from "./Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { getItemsHandler, resetGetItem } from "../3-actions/itemActions";
import AgendaItem from "./Components/AgendaItem";

export default function Agenda() {
  const dispatch = useDispatch();

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  useEffect(() => {
    dispatch(getItemsHandler("agenda", null, null, null));
    return () => {
      dispatch(resetGetItem());
    };
  }, []);
  return (
    <div className="agenda">
      <Nav />
      <div className="page-content">
        <div className="text-container">
          <h1>Agenda</h1>
        </div>
        <div className="agenda-container">
          {items
            .reverse()
            .map((item, i) =>
              item.content === "agenda" ? (
                <AgendaItem key={i} item={item} />
              ) : null
            )}
        </div>
      </div>
    </div>
  );
}
