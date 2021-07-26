import React, { useEffect } from "react";
import "../../1-css/PageBlog.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constants";
import { MdDateRange, MdPlace } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsHandler, resetGetItem } from "../../3-actions/itemActions";
import { LoadingSpinnerFullPage } from "./SmallComponents";
import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function PageBlog(props) {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler(null, null, null, null, id));
    return () => {
      dispatch(resetGetItem());
    };
  }, [id]);

  return (
    <div className="page-blog">
      <Nav color={"black"} />
      {items[0] ? (
        <div className="page-blog-content">
          <div className="photo-container">
            <img
              src={items[0].photos[items[0].photos.length - 1].src}
              alt={items[0].title}
            />
          </div>
          <div className="text-container">
            <div className="details-infos">
              <p>
                <span>
                  <MdDateRange size={30} />
                </span>
                {items[0].date}
              </p>
              <p>
                <span>
                  <MdPlace size={30} />
                </span>
                {items[0].place}
              </p>
            </div>
            <h2>{items[0].title}</h2>
            <div className="editor-js">
              <EditorJs
                tools={EDITOR_JS_TOOLS}
                data={items[0].description}
                readOnly
              />
            </div>
          </div>
          <div className="photos-container">
            {items[0].photos.map((photo, i) => (
              <img src={photo.src} alt={items[0].title} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
