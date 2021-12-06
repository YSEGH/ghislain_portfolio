import React, { useEffect } from "react";
import "../1-css/Agenda.css";
import Nav from "./Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { getItemsHandler, resetGetItem } from "../3-actions/itemActions";
import AgendaItem from "./Components/AgendaItem";
import Title from "./Components/Title";

export default function Agenda() {
  const dispatch = useDispatch();

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingItems, items, count, error: errorItems } = getItem;

  useEffect(() => {
    document.title = "Ghislain Ramage - Agenda";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Would you like to know where you can find me ? Here you will find my future performances."
      );
    return () => {};
  }, []);

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
        <Title title="Agenda" />
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
