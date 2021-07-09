import React, { useEffect } from "react";
import FormAddContenu from "./FormAddContenu";
import "../../1-css/PageContenu.css";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getItemsHandler } from "../../3-actions/itemActions";
import { useParams } from "react-router";

export default function PageContenu(props) {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const { itemId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    dispatch(getItemsHandler(null, null, itemId));
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
        {items[0] && <FormAddContenu update={true} item={items[0]} />}
      </div>
    </div>
  );
}
