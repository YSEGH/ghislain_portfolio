import React from "react";
import { Link } from "react-router-dom";
import "../../1-css/Logo.css";

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <h1>
        Ghislain
        <br /> Ramage
      </h1>
    </Link>
  );
}
