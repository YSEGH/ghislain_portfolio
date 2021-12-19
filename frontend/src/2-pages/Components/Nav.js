import React, { useEffect } from "react";
import "../../1-css/Nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfosHandler } from "../../3-actions/infoActions";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import Logo from "./Logo";

export default function Nav() {
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

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

  useEffect(() => {
    dispatch(getInfosHandler());

    return () => {};
  }, []);

  return (
    <div className="nav close">
      <div className="nav-burger" onClick={() => displayNav()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="nav-content">
        <Logo />
        <ul className="nav-ul">
          <li>
            <NavLink activeClassName="active" to="/home" exact>
              <AiOutlineHome size={25} />
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/about" exact>
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/circus">
              Circus
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/photography">
              Photography
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/blog">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/projects">
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/contact">
              Contact
            </NavLink>
          </li>
          {localStorage.getItem("token") ? (
            <li>
              <NavLink
                activeClassName="active"
                to="/admin/mon-compte"
                style={{ fontWeight: "200" }}
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
        <NavLink activeClassName="active" to="/agenda" exact>
          Agenda
        </NavLink>
        <div className="network-container">
          <a href={`${infos.instagram}`} target="_blank">
            <FiInstagram size={20} />
          </a>
          <a href={`${infos.facebook}`} target="_blank">
            <FiFacebook size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
