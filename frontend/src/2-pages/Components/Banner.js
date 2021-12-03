import React, { useEffect, useState } from "react";
import "../../1-css/Banner.css";
import "../../1-css/Animations.css";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfosHandler } from "../../3-actions/infoActions";
import "react-toastify/dist/ReactToastify.css";
import { BannerLoading, LoadingSpinnerFullPage } from "./SmallComponents";

export default function Banner() {
  const [loadingData, setLoadingData] = useState(true);
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  const launchVideo = () => {
    var video = document.querySelector(".video-banner");
    video.muted = true;
    video.play();
    setLoadingData(false);
  };

  useEffect(() => {
    dispatch(getInfosHandler());

    return () => {};
  }, []);

  return (
    <div className="banner part">
      <video
        className="video-banner"
        src="/static-files/videos/video-banner-1.mp4"
        type="video/mp4"
        muted
        autoPlay
        loop
        onLoadedData={() => launchVideo()}
        poster="/static-files/images/poster-bannier.png"
      />
      <div className="mask"></div>

      {loadingData ? (
        <>{/* <BannerLoading /> */}</>
      ) : (
        <div
          className="text-container fade-in" /* className="fade-in-bottom" */
        >
          <h1>
            Ghislain<span>Ramage</span>
          </h1>
          <div className="links-container ">
            <Link to="/circus" onClick={() => window.scrollTo(0, 0)}>
              Circus
            </Link>
            <Link to="/photography" onClick={() => window.scrollTo(0, 0)}>
              Photography
            </Link>
          </div>
          <p>Circus artist and photographer as a hobby.</p>
        </div>
      )}
      <div className="network-container fade-in">
        <a href={`${infos.instagram}`} target="_blank">
          <FiInstagram size={20} />
        </a>
        <a href={`${infos.facebook}`} target="_blank">
          <FiFacebook size={20} />
        </a>
      </div>
    </div>
  );
}
