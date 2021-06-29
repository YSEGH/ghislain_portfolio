import React from "react";
import "../../1-css/Banner.css";
import Nav from "./Nav";
import { FiInstagram, FiFacebook } from "react-icons/fi";

export default function Banner() {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: "url(/images/KENZO-2.png)",
        backgroundSize: "cover",
        backgroundPosition: "left center",
      }}
    >
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
            <button>Contact</button>
            <button>About</button>
          </div>
        </div>
      </div>
    </div>
  );
}
