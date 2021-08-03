import React, { useEffect } from "react";
import MaterialTable from "material-table";
import "../../1-css/TableItem.css";
import { BiSearch } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemHandler,
  getItemsHandler,
  resetGetItem,
  resetItemSuccess,
} from "../../3-actions/itemActions";
import { TABLE_ICONS } from "../../constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function TableItems() {
  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingGet, items, error: errorGet } = getItem;

  const deleteItem = useSelector((state) => state.deleteItem);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = deleteItem;

  const dispatch = useDispatch();

  const onClickDeleteItem = (itemId) => {
    dispatch(deleteItemHandler(itemId));
  };

  useEffect(() => {
    dispatch(getItemsHandler());
    return () => {
      dispatch(resetGetItem());
    };
  }, []);

  useEffect(() => {
    if (successDelete) {
      dispatch(resetGetItem());
      dispatch(getItemsHandler());
      toast.success("Suppression effectuée !");
      dispatch(resetItemSuccess());
    }
    if (errorDelete) {
      toast.error(errorDelete);
      dispatch(resetItemSuccess());
    }
    return () => {};
  }, [successDelete, errorDelete]);

  return (
    <div className="table-items">
      <MaterialTable
        icons={TABLE_ICONS}
        style={{ boxShadow: "none", color: "#303030" }}
        options={{
          exportButton: false,
          pageSize: 50,
        }}
        columns={[
          { title: "Titre", field: "title" },
          {
            title: "Type",
            field: "content",
            render: (RowData) => {
              switch (RowData.content) {
                case "circus":
                  return "Cirque";
                case "photography":
                  return "Photo";
                case "blog":
                  return "Blog";
                case "project":
                  return "Projet";
                case "agenda":
                  return "Agenda";
                default:
                  break;
              }
            },
          },
          {
            render: (RowData) => (
              <Link
                className="button-page-contenu"
                to={`/admin/mon-compte/contenu/${RowData._id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <BiSearch size={30} />
              </Link>
            ),
          },
          {
            render: (RowData) => (
              <>
                <button
                  className="button-delete-contenu"
                  onClick={() => onClickDeleteItem(RowData._id)}
                >
                  <MdDelete size={30} />
                </button>
              </>
            ),
          },
        ]}
        data={items}
        title="Contenu"
      />
    </div>
  );
}
