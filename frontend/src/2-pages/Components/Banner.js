import React, { useEffect } from "react";
import "../../1-css/Banner.css";
import Nav from "./Nav";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfosHandler } from "../../3-actions/infoActions";
import "react-toastify/dist/ReactToastify.css";

export default function Banner() {
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  useEffect(() => {
    dispatch(getInfosHandler());

    return () => {};
  }, []);
  return (
    <div className="banner part">
      <video
        className="video-banner"
        src="/static-files/videos/video-bannier.mp4"
        autoPlay
        type="video/mp4"
        muted
        loop
      />
      <div className="mask"></div>
      <div className="text-container">
        <h1>
          Ghislain
          <br /> Ramage
        </h1>
        <div className="links-container">
          <Link to="/circus" onClick={() => window.scrollTo(0, 0)}>
            Circus
          </Link>
          <span>&</span>
          <Link to="/photography" onClick={() => window.scrollTo(0, 0)}>
            Photography
          </Link>
        </div>
        <div className="network-container">
          <a href={`${infos.instagram}`} target="_blank">
            <FiInstagram size={20} />
          </a>
          <a href={`${infos.facebook}`} target="_blank">
            <FiFacebook size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
