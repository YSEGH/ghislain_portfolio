import React from "react";
import "../../1-css/Footer.css";
import { FiInstagram, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <div className="footer">
      <div className="text-container">
        <h1>Ghislain Gramage</h1>
        <ul>
          <li>About</li>
          <li>|</li>
          <li>Circus</li>
          <li>|</li>
          <li>Photography</li>
          <li>|</li>
          <li>Blog</li>
          <li>|</li>
          <li>Contact</li>
        </ul>
        <p>Paris / +330620706551 / youssef.segh@hotmail.fr</p>
        <div className="network-container">
          <FiInstagram size={30} />
          <FiFacebook size={30} />
        </div>
      </div>
      <div className="legal-notice">
        <p>Copyright © 2019 YS Development | All rights reserved </p>
      </div>
    </div>
  );
}
