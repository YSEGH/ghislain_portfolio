import React from "react";
import "../../1-css/NavAdmin.css";
import { NavLink } from "react-router-dom";

export default function NavAdmin() {
  return (
    <ul className="nav-admin">
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline", color: "#ff0513" }}
          to="/admin/mon-compte/mes-infos"
          exact
        >
          Mes infos
        </NavLink>
      </li>
      <span>|</span>
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline", color: "#ff0513" }}
          to="/admin/mon-compte/contenu"
          exact
        >
          Contenu
        </NavLink>
      </li>
      <span>|</span>
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline", color: "#ff0513" }}
          to="/admin/mon-compte/ajouter-contenu"
        >
          Ajouter contenu
        </NavLink>
      </li>
      <span>|</span>
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline", color: "#ff0513" }}
          to="/admin/mon-compte/infos-generales"
        >
          Infos générales
        </NavLink>
      </li>
    </ul>
  );
}
