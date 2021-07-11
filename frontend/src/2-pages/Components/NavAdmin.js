import React from "react";
import "../../1-css/NavAdmin.css";
import { NavLink } from "react-router-dom";

export default function NavAdmin({ color }) {
  return (
    <ul className="nav-admin">
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline" }}
          to="/admin/mon-compte/contenu"
          style={{ color: color }}
          exact
        >
          Contenu
        </NavLink>
      </li>
      <span>|</span>
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline" }}
          to="/admin/mon-compte/ajouter-contenu"
          style={{ color: color }}
        >
          Ajouter contenu
        </NavLink>
      </li>
      <span>|</span>
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline" }}
          to="/admin/mon-compte/infos-generales"
          style={{ color: color }}
        >
          Infos générales
        </NavLink>
      </li>
    </ul>
  );
}
