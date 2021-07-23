import React from "react";
import { ImSpinner6 } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import "../../1-css/LoadingSpinner.css";

function LoadingSVG() {
  return <ImSpinner6 className="loading-svg" size={40} />;
}

function LoadingSpinner() {
  return <div className="small-component loading"></div>;
}
function LoadingSpinnerFixed() {
  return (
    <div className="small-component loading fixed">
      <ImSpinner6 size={40} />
    </div>
  );
}

function LoadingSpinnerFullPage() {
  return (
    <div className="small-component full-page loading">
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

export {
  LoadingSVG,
  LoadingSpinner,
  LoadingSpinnerFixed,
  SuccessUpdate,
  LoadingSpinnerFullPage,
};
