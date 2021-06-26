import React from "react";
import { ImSpinner6 } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import "../../1-css/LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="small-component loading">
      <ImSpinner6 size={40} />
    </div>
  );
}
function LoadingSpinnerFixed() {
  return (
    <div className="small-component loading fixed">
      <ImSpinner6 size={40} />
    </div>
  );
}
function SuccessUpdate() {
  return (
    <div className="small-component success fixed">
      <TiTick size={40} />
    </div>
  );
}

export { LoadingSpinner, LoadingSpinnerFixed, SuccessUpdate };
