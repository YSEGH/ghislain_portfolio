import React from "react";
import { Link } from "react-router-dom";

import "../../1-css/Portfolio.css";
import { MdPhotoCamera } from "react-icons/md";
import { GiBarracksTent } from "react-icons/gi";
import { ImNewspaper } from "react-icons/im";

export default function Portfolio() {
  return (
    <div className="portfolio part">
      <Link
        to="/circus"
        onClick={() => window.scrollTo(0, 0)}
        className="part-button circus"
        style={{ backgroundImage: "url(/images/Kooza-7.jpg)" }}
      >
        <div className="mask"></div>
        <div className="text-container">
          <GiBarracksTent size={75} />
          <h2> Circus</h2>
        </div>
      </Link>
      <Link
        to="/photography"
        onClick={() => window.scrollTo(0, 0)}
        className="part-button photography"
        style={{ backgroundImage: "url(/images/large.jpg)" }}
      >
        <div className="mask"></div>
        <div className="text-container">
          <MdPhotoCamera size={75} />
          <h2>Photography</h2>
        </div>
      </Link>
      {/* <Link
        to="/blog"
        onClick={() => window.scrollTo(0, 0)}
        className="part-button blog"
        style={{ backgroundImage: "url(/images/photo.jpg)" }}
      >
        <div className="mask"></div>
        <div className="text-container">
          <ImNewspaper size={50} />
          <h2>Blog</h2>
        </div>
      </Link> */}
    </div>
  );
}
