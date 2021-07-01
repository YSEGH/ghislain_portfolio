import React from "react";
import "../../1-css/Banner.css";
import Nav from "./Nav";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div
      className="banner"
      style={
        {
          /*         backgroundSize: "cover",
        backgroundPosition: "left center", */
        }
      }
    >
      <video
        className="video-banner"
        src="/videos/VIDEO-KENZO.mp4"
        autoPlay
        type="video/mp4"
        muted
        loop
      />
      <div className="mask"></div>
      <Nav color="white" />
      <div className="text-container">
        <h1>Portfolio</h1>
        <div>
          <h1>
            Ghislain
            <br /> Ramage
          </h1>
          <p>
            <span>Circus/Photography</span> Artist.
          </p>
          <p>Find Me on</p>
          <div className="network-container">
            <FiInstagram size={30} />
            <FiFacebook size={30} />
          </div>
          <div className="buttons-container">
            <button
              onClick={() => {
                document.getElementById("contact").scrollIntoView();
              }}
              className="button"
            >
              Contact
            </button>
            <Link
              to="/about"
              className="button"
              onClick={() => window.scrollTo(0, 0)}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
