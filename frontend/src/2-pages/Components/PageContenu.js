import React, { useEffect } from "react";
import "../../1-css/PageContenu.css";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getItemsHandler } from "../../3-actions/itemActions";
import { useParams } from "react-router";
import FormCircus from "./FormCircus";
import FormPhotos from "./FormPhotos";
import FormBlog from "./FormBlog";
import FormProject from "./FormProject";
import FormAgenda from "./FormAgenda";

export default function PageContenu(props) {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const { itemId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler(null, null, null, null, itemId));
    return () => {};
  }, []);

  return (
    <div className={`page page-contenu`}>
      <BiArrowBack
        className="back-icon"
        size={25}
        onClick={() => {
          props.history.goBack();
        }}
      />
      <div className="page-body" onClick={(e) => e.stopPropagation()}>
        {items[0] ? (
          items[0].content === "circus" ? (
            <FormCircus update={true} item={items[0]} />
          ) : items[0].content === "photography" ? (
            <FormPhotos update={true} item={items[0]} />
          ) : items[0].content === "blog" ? (
            <FormBlog update={true} item={items[0]} />
          ) : items[0].content === "project" ? (
            <FormProject update={true} item={items[0]} />
          ) : items[0].content === "agenda" ? (
            <FormAgenda update={true} item={items[0]} />
          ) : null
        ) : null}
      </div>
    </div>
  );
}
