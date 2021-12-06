import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemsHandler, resetGetItem } from "../../3-actions/itemActions";
import Nav from "./Nav";
import { MdDateRange, MdWork, MdPlace } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import "../../1-css/PageItem.css";

export default function PageItem() {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

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

  const displayInfos = () => {
    const text = document.querySelector(".page-item .text-container");
    const button = document.querySelector(".page-item .show-infos-button");

    if (text.classList.contains("active")) {
      text.classList.remove("active");
      button.classList.remove("active");
    } else {
      text.classList.add("active");
      button.classList.add("active");
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
      document.title =
        items[0].title + (items[0].subtitle ? " - " + items[0].subtitle : "");
    }
    return () => {};
  }, [items]);

  return (
    <div className="page-item">
      <Nav />
      <div className="page-content">
        {items[0] &&
        (items[0].content === "project" || items[0].content === "circus") ? (
          <>
            <div className="show-infos">
              <button
                className="show-infos-button"
                onClick={() => displayInfos()}
              >
                <FiChevronDown size={25} /> Infos
              </button>
            </div>
            <div className="text-container">
              <h1>
                {items[0].title}
                {items[0].subtitle ? <span> - {items[0].subtitle}</span> : null}
              </h1>
              <p>
                {items[0].description}
                {items[0].description}
              </p>
              <div>
                <p>
                  <MdDateRange size={30} />
                  {items[0].date}
                </p>
              </div>
            </div>
          </>
        ) : null}
        {items[0]
          ? items[0].photos.reverse().map((file, i) =>
              file.type.split("/")[0] === "image" ? (
                <div
                  className="photo-content"
                  onClick={(e) => displayFile(e)}
                  key={i}
                >
                  <div
                    className="photo-background"
                    onClick={(e) => displayFile(e)}
                  >
                    <img src={file.src} alt={items[0].title} />
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
                    <video src={file.src} controls />
                  </div>
                </div>
              )
            )
          : null}
      </div>
    </div>
  );
}
