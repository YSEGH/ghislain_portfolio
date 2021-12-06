import React from "react";
import "../../1-css/Title.css";

export default function Title({ title }) {
  return (
    <div className="title">
      <h2>{title}</h2>
    </div>
  );
}
