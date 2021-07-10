import React, { useEffect, useRef } from "react";
import "../1-css/About.css";
import Nav from "./Components/Nav";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getInfosHandler } from "../3-actions/infoActions";

export default function About() {
  const getInfos = useSelector((state) => state.getInfos);
  const { loading: loadingGet, infos, error: errorGet } = getInfos;

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(infos).length === 0) {
      dispatch(getInfosHandler());
    }
    return () => {};
  }, []);

  return (
    <div className="about" id="about">
      <Nav color="black" />
      <div className="text-container">
        <h1>About Me</h1>
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
      <div className="photo-container">
        <img src={infos.aboutPhoto} alt="ghislain_ramage" />
      </div>
    </div>
  );
}
