import React from "react";
import "../../1-css/Nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Nav({ background = "#fff", color }) {
  const displayNav = () => {
    const nav = document.getElementsByClassName("nav")[0];
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      nav.classList.add("close");
    } else {
      nav.classList.remove("close");
      nav.classList.add("open");
    }
  };

  return (
    <>
      <GiHamburgerMenu
        size={40}
        style={{ color: color }}
        className="nav-burger"
        onClick={() => displayNav()}
      />
      <ul className="nav close" style={{ backgroundColor: background }}>
        <li>
          <NavLink
            activeClassName="active"
            to="/"
            style={{ color: color }}
            exact
          >
            <AiOutlineHome size={25} />
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to="/about"
            style={{ color: color }}
            exact
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to="/circus"
            style={{ color: color }}
          >
            Circus
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to="/photography"
            style={{ color: color }}
          >
            Photography
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/blog" style={{ color: color }}>
            Blog
          </NavLink>
        </li>
        {localStorage.getItem("token") ? (
          <li>
            <NavLink
              activeClassName="active"
              to="/admin/mon-compte"
              style={{ color: color }}
            >
              Admin
            </NavLink>
          </li>
        ) : null}
        {localStorage.getItem("token") ? (
          <li>
            <NavLink
              activeClassName="logout"
              to="/"
              style={{ color: color }}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }}
              exact
            >
              <BiLogOut size={25} />
            </NavLink>
          </li>
        ) : null}
      </ul>
    </>
  );
}
