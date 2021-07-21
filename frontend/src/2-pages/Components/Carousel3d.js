import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";
import "../../1-css/Carousel3d.css";
import ModalPress from "./ModalPress";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
// const isEqual = require("react-fast-compare");

export default function Carousel3d(props) {
  const [slideTotal, setSlideTotal] = useState(0);
  const [slideCurrent, setSlideCurrent] = useState(-1);
  const [slides, setSlides] = useState([]);
  const [height, setHeight] = useState("0px");
  const [srcFile, setSrcFile] = useState(null);
  const intervalRef = useRef();
  const handlers = useSwipeable({
    onSwipedLeft: () => slideRight(),
    onSwipedRight: () => slideLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  useEffect(() => {
    //console.log("slides change");
    const locSlides = [];
    props.slides.forEach((slide) => {
      slide.class = "slider-single proactivede";
      locSlides.push(slide);
    });
    setSlides(locSlides);
    setSlideTotal(props.slides.length - 1);
    setSlideCurrent(-1);
    if (slideCurrent === -1) {
      setTimeout(() => {
        slideRight();
        if (props.autoplay) {
          intervalRef.interval = setTimeout(() => {
            slideRight();
          }, props.interval);
        }
      }, 500);
    }
  }, [props.slides]);
  useEffect(() => {
    if (slideCurrent === -1) {
      setTimeout(() => {
        slideRight();
      }, 500);
    }
  }, [slides, slideCurrent]);

  const openModal = () => {
    const modalItem = document.querySelector(".modal.press-modal");
    modalItem.classList.add("open");
    modalItem.classList.remove("close");
  };

  const slideRight = () => {
    let preactiveSlide;
    let proactiveSlide;
    let slideCurrentLoc = slideCurrent;

    const activeClass = "slider-single active";
    const slide = [...slides];
    if (slideTotal > 1) {
      if (slideCurrentLoc < slideTotal) {
        slideCurrentLoc++;
      } else {
        slideCurrentLoc = 0;
      }
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[slideTotal];
      }
      const activeSlide = slide[slideCurrentLoc];
      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1];
      } else {
        proactiveSlide = slide[0];
      }

      slide.forEach((slid, index) => {
        if (slid.class.includes("preactivede")) {
          slid.class = "slider-single proactivede";
        }
        if (slid.class.includes("preactive")) {
          slid.class = "slider-single preactivede";
        }
      });

      preactiveSlide.class = "slider-single preactive";
      activeSlide.class = activeClass;
      proactiveSlide.class = "slider-single proactive";
      setSlides(slide);
      setSlideCurrent(slideCurrentLoc);

      if (document.getElementsByClassName("slider-single active").length > 0) {
        setTimeout(() => {
          if (
            document.getElementsByClassName("slider-single active").length > 0
          ) {
            const height = document.getElementsByClassName(
              "slider-single active"
            )[0].clientHeight;
            setHeight(`${height}px`);
          }
        }, 500);
      }
      if (props.autoplay) {
        clearTimeout(intervalRef.interval);
        intervalRef.interval = setTimeout(() => {
          slideRight();
        }, props.interval);
      }
    } else if (slide[0] && slide[0].class !== activeClass) {
      slide[0].class = activeClass;
      setSlides(slide);
      setSlideCurrent(0);
    }
  };
  const slideLeft = () => {
    if (slideTotal > 1) {
      let preactiveSlide;
      let proactiveSlide;
      let slideCurrentLoc = slideCurrent;
      const slide = [...slides];
      if (slideCurrentLoc > 0) {
        slideCurrentLoc--;
      } else {
        slideCurrentLoc = slideTotal;
      }

      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1];
      } else {
        proactiveSlide = slide[0];
      }
      let activeSlide = slide[slideCurrentLoc];
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[slideTotal];
      }
      slide.forEach((slid, index) => {
        if (slid.class.includes("proactivede")) {
          slid.class = "slider-single preactivede";
        }
        if (slid.class.includes("proactive")) {
          slid.class = "slider-single proactivede";
        }
      });
      preactiveSlide.class = "slider-single preactive";
      activeSlide.class = "slider-single active";
      proactiveSlide.class = "slider-single proactive";
      setSlides(slide);
      setSlideCurrent(slideCurrentLoc);
      if (document.getElementsByClassName("slider-single active").length > 0) {
        setTimeout(() => {
          if (
            document.getElementsByClassName("slider-single active").length > 0
          ) {
            const height = document.getElementsByClassName(
              "slider-single active"
            )[0].clientHeight;
            setHeight(`${height}px`);
          }
        }, 500);
      }
    }
  };

  const sliderClass = (direction) => {
    let sliderClass = `slider-${direction}`;
    if (!props.arrows) {
      sliderClass = "slider-disabled";
    } else if (props.arrows && !props.arrowBorders) {
      sliderClass = `slider-${direction}-noborders`;
    }
    return sliderClass;
  };

  return (
    <>
      <ModalPress item={srcFile} />
      <div className="react-3d-carousel" style={{ height }} {...handlers}>
        {slides && slides.length > 0 && (
          <div className="slider-container">
            <div className="slider-content">
              {slides.map((slider, index) => (
                <div className={slider.class} key={index}>
                  <div className={sliderClass("left")} onClick={slideLeft}>
                    <div>
                      <MdNavigateBefore size={40} />
                    </div>
                  </div>
                  <div className={sliderClass("right")} onClick={slideRight}>
                    <div>
                      <MdNavigateNext size={40} />
                    </div>
                  </div>

                  <div
                    className="slider-single-content"
                    onClick={() => {
                      setSrcFile(slider);
                      openModal();
                    }}
                  >
                    <img src={slider.photos[0].src} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
Carousel3d.propTypes = {
  slides: PropTypes.array,
  autoplay: PropTypes.bool,
  interval: PropTypes.number,
  arrows: PropTypes.bool,
  arrowBorders: PropTypes.bool,
};
Carousel3d.defaultProps = {
  autoplay: false,
  interval: 3000,
  arrows: true,
  arrowBorders: true,
};
