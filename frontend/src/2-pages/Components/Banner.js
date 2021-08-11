import React, { useEffect, useState } from "react";
import "../../1-css/Banner.css";
import "../../1-css/Animations.css";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfosHandler } from "../../3-actions/infoActions";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinnerFullPage, LoadingSVG } from "./SmallComponents";

export default function Banner() {
  const [loadingData, setLoadingData] = useState(true);
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  const checkLoaded = (video) => {
    if (video.readyState === 4) {
      console.log("4");
      setLoadingData(false);
    }
  };

  useEffect(() => {
    var video = document.querySelector(".video-banner");
    /*     video.addEventListener("loadeddata", () => checkLoaded(video));
     */
    dispatch(getInfosHandler());

    return () => {};
  }, []);

  return (
    <div className="banner part">
      <video
        className="video-banner"
        src="/static-files/videos/video-banner.mp4"
        poster="/static-files/images/poster-bannier.png"
        muted
        autoPlay
        type="video/mp4"
        loop
      />
      <div className="mask"></div>
      {/*       {loadingData ? (
        <LoadingSpinnerFullPage color="#ff0513" />
      ) : ( */}
      <div className="text-container">
        <div className="fade-in-bottom">
          <h1>
            Ghislain
            <br /> Ramage
          </h1>
          <div className="links-container">
            <Link to="/circus" onClick={() => window.scrollTo(0, 0)}>
              Circus
            </Link>
            <Link to="/photography" onClick={() => window.scrollTo(0, 0)}>
              Photography
            </Link>
          </div>
        </div>
        <div className="network-container fade-in">
          <a href={`${infos.instagram}`} target="_blank">
            <FiInstagram size={20} />
          </a>
          <a href={`${infos.facebook}`} target="_blank">
            <FiFacebook size={20} />
          </a>
        </div>
      </div>
      {/*       )} */}
    </div>
  );
}
