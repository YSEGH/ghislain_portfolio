import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../1-css/Footer.css";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getInfosHandler } from "../../3-actions/infoActions";

export default function Footer() {
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  useEffect(() => {
    dispatch(getInfosHandler());
    return () => {};
  }, []);
  return (
    <div className="footer part">
      <div className="text-container">
        <h1>
          {infos.firstname} {infos.lastname}
        </h1>
        <ul>
          <li>
            <Link
              to="/about"
              className="button"
              onClick={() => window.scrollTo(0, 0)}
            >
              About
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/circus" onClick={() => window.scrollTo(0, 0)}>
              Circus
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/photography" onClick={() => window.scrollTo(0, 0)}>
              Photography
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/blog" onClick={() => window.scrollTo(0, 0)}>
              Blog
            </Link>
          </li>
        </ul>
        <p>
          {infos.city}, {infos.country} / {infos.phone} / {infos.email}
        </p>
        <div className="network-container">
          <a href={`${infos.instagram}`} target="_blank">
            <FiInstagram size={30} />
          </a>
          <a href={`${infos.facebook}`} target="_blank">
            <FiFacebook size={30} />
          </a>
        </div>
      </div>
      <div className="legal-notice">
        <p>Copyright © 2021 YS Development | All rights reserved </p>
      </div>
    </div>
  );
}
