import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/Blog.css";
import { getItemsHandler, resetItemSuccess } from "../3-actions/itemActions";
import BlogsContainer from "./Components/BlogsContainer";
import Nav from "./Components/Nav";

export default function Blog() {
  const getItem = useSelector((state) => state.getItem);
  const { loading, items, error } = getItem;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsHandler("blog"));
    return () => {
      dispatch(resetItemSuccess());
    };
  }, []);

  return (
    <>
      <div className="blog">
        <Nav color={"black"} />
        <div className="text-container">
          <h1>Blog</h1>
          <ul className="filter-container">
            <li>Asia</li>
            <li>Europe</li>
            <li>USA</li>
            <li>Africa</li>
          </ul>
          <BlogsContainer items={items} />
        </div>
      </div>
    </>
  );
}
