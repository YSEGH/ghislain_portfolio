import React, { useEffect, useState } from "react";
import "../../1-css/PageBlog.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constants";
import { MdDateRange, MdPlace } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsHandler, resetGetItem } from "../../3-actions/itemActions";
import Nav from "./Nav";

export default function PageBlog(props) {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const [images, setImages] = useState(null);

  const { itemId } = useParams();

  const dispatch = useDispatch();

  const displayFile = (e) => {
    e.stopPropagation();

    const videos = document.querySelectorAll("video");
    let target;

    if (e.target.classList.contains("photo-content")) {
      target = e.target;
    } else {
      target = e.target.parentElement;
    }

    if (target.classList.contains("active")) {
      target.classList.remove("active");
      for (let i = 0; i < videos.length; i++) {
        videos[i].pause();
      }
    } else {
      target.classList.add("active");
    }
  };

  useEffect(() => {
    dispatch(getItemsHandler(null, null, null, null, itemId));
    return () => {
      dispatch(resetGetItem());
    };
  }, [itemId]);

  useEffect(() => {
    if (items[0]) {
      setImages(
        items[0].photos.filter((photo) => photo.type.split("/")[0] !== "video")
      );
    }
    return () => {};
  }, [items]);

  return (
    <div className="page-blog">
      <Nav color={"black"} />
      {items[0] ? (
        <div className="page-blog-content">
          <div className="photo-container">
            {images && (
              <img src={images[images.length - 1].src} alt={items[0].title} />
            )}
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
            {items[0].photos.map((photo, i) =>
              photo.type.split("/")[0] === "image" ? (
                <div
                  className="photo-content"
                  onClick={(e) => displayFile(e)}
                  key={i}
                >
                  <div
                    className="photo-background"
                    onClick={(e) => displayFile(e)}
                  >
                    <img src={photo.src} alt={items[0].title} />
                  </div>
                </div>
              ) : (
                <div
                  className="photo-content"
                  onClick={(e) => displayFile(e)}
                  key={i}
                >
                  <div
                    className="photo-background"
                    onClick={(e) => displayFile(e)}
                  >
                    <video src={photo.src} controls />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
