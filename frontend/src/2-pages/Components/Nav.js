import React from "react";
import "../../1-css/Nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

export default function Nav({ color }) {
  return (
    <>
      <GiHamburgerMenu
        size={40}
        style={{ color: color }}
        className="nav-burger"
      />
      <ul className="nav">
        <li>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "#ffff" }}
            to="/"
            style={{ color: color }}
            exact
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "#ffff" }}
            to="/circus"
            style={{ color: color }}
          >
            Circus
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "#ffff" }}
            to="/photography"
            style={{ color: color }}
          >
            Photography
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "#ffff" }}
            to="/blog"
            style={{ color: color }}
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "#ffff" }}
            to="/admin"
            style={{ color: color }}
          >
            Admin
          </NavLink>
        </li>
      </ul>
    </>
  );
}
