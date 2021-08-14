import React, { useEffect } from "react";
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

function LoadingSpinnerFullPage({ color }) {
  return (
    <div className="small-component full-page loading">
      <ImSpinner6 size={40} fontStyle={{ color: color }} />
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

function BannerLoading() {
  const scaleSpan = () => {
    const span = document.getElementsByClassName("span-loader");
    if (!span.length) {
      clearTimeout();
      clearInterval();
      return;
    }
    for (let i = 0; i < span.length; i++) {
      span[i].classList.add("active");
      setTimeout(() => {
        if (span[i]) {
          span[i].classList.remove("active");
        }
      }, (i + 1) * 750);
    }

    setInterval(() => {
      for (let i = 0; i < span.length; i++) {
        span[i].classList.add("active");
        setTimeout(() => {
          if (span[i]) {
            span[i].classList.remove("active");
          }
        }, (i + 1) * 750);
      }
    }, 2275);
  };

  useEffect(() => {
    scaleSpan();
    return () => {};
  }, []);

  return (
    <div className="small-component banner-loader">
      <div className="span-container">
        <span className="span-loader"></span>
        <span className="span-loader"></span>
        <span className="span-loader"></span>
      </div>
    </div>
  );
}

export {
  BannerLoading,
  LoadingSVG,
  LoadingSpinner,
  LoadingSpinnerFixed,
  SuccessUpdate,
  LoadingSpinnerFullPage,
};
