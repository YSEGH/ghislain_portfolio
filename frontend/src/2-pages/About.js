import React, { useEffect } from "react";
import "../1-css/About.css";
import Nav from "./Components/Nav";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getInfosHandler } from "../3-actions/infoActions";
import Title from "./Components/Title";

export default function About() {
  const getInfos = useSelector((state) => state.getInfos);
  const { loading: loadingGet, infos, error: errorGet } = getInfos;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Ghislain Ramage - About";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Want to know more about me ? That’s what this page is for."
      );
    if (Object.keys(infos).length === 0) {
      dispatch(getInfosHandler());
    }
    return () => {};
  }, []);

  return (
    <>
      <div className="about" id="about">
        <Nav color="black" />
        <div className="text-container">
          <Title title="About" />
          <div className="photo-container">
            {infos.aboutPhoto && (
              <img src={infos.aboutPhoto} alt="ghislain_ramage" />
            )}
          </div>
          <div className="paragraphe-container">
            {infos.aboutDescription && (
              <EditorJs
                tools={EDITOR_JS_TOOLS}
                data={infos.aboutDescription}
                readOnly
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
