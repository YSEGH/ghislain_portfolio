import React, { useEffect } from "react";
import "../../1-css/PageContenu.css";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getItemsHandler } from "../../3-actions/itemActions";
import { useParams } from "react-router";
import FormCircus from "./FormCircus";
import FormPhotos from "./FormPhotos";
import FormBlog from "./FormBlog";

export default function PageContenu(props) {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const { itemId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(itemId);
    dispatch(getItemsHandler(null, null, null, null, itemId));
    return () => {};
  }, [itemId]);

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
          ) : null
        ) : null}
      </div>
    </div>
  );
}
