import React from "react";
import "../../1-css/Banner.css";
import Nav from "./Nav";
import { FiInstagram, FiFacebook } from "react-icons/fi";

export default function Banner() {
  return (
    <div className="banner">
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
            <button>Circus</button>
            <button>Photography</button>
          </div>
        </div>
      </div>
    </div>
  );
}
