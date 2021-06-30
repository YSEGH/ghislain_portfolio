import React from "react";
import "../../1-css/Footer.css";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="text-container">
        <h1>Ghislain Gramage</h1>
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
          <li>|</li>
          <li>
            <Link
              to="#"
              onClick={() => {
                document.getElementById("contact").scrollIntoView();
              }}
              className="button"
            >
              Contact
            </Link>
          </li>
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
