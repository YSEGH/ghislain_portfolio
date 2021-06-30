import React from "react";
import { Link } from "react-router-dom";

import "../../1-css/Portfolio.css";
import { MdPhotoCamera } from "react-icons/md";
import { GiBarracksTent } from "react-icons/gi";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h1>You want to see my work ?</h1>
      <Link
        to="/circus"
        onClick={() => window.scrollTo(0, 0)}
        className="part circus"
        style={{ backgroundImage: "url(/images/KENZO-2.png)" }}
      >
        <div className="mask"></div>
        <div className="text-container">
          <GiBarracksTent size={50} />
          <h2>Circus</h2>
        </div>
      </Link>
      <Link
        to="/photography"
        onClick={() => window.scrollTo(0, 0)}
        className="part photography"
        style={{ backgroundImage: "url(/images/large.jpg)" }}
      >
        <div className="mask"></div>
        <div className="text-container">
          <MdPhotoCamera size={50} />
          <h2>Photo</h2>
        </div>
      </Link>
    </div>
  );
}
