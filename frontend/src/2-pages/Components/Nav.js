import React from "react";
import "../../1-css/Nav.css";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Nav({ color }) {
  return (
    <>
      <GiHamburgerMenu
        size={40}
        style={{ color: color }}
        className="nav-burger"
      />
      <ul className="nav">
        <li className="active">About</li>
        <li style={{ color: color }}>Circus</li>
        <li style={{ color: color }}>Photography</li>
        <li style={{ color: color }}>Blog</li>
        <li style={{ color: color }}>Contact</li>
      </ul>
    </>
  );
}
