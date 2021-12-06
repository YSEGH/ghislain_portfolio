import React, { useEffect } from "react";
import "../1-css/Category.css";
import CircusContainer from "./Components/CircusContainer";
import FilterContainer from "./Components/FilterContainer";
import Nav from "./Components/Nav";
import Title from "./Components/Title";

export default function Circus(props) {
  useEffect(() => {
    document.title = "Ghislain Ramage - Circus";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Discover all the experiences of Ghislain Ramage as a Cyr wheel artist through the world."
      );
    return () => {};
  }, []);

  return (
    <>
      <div className="category circus">
        <Nav />
        <div className="page-content">
          <Title title="Circus" />
          <div className="text-container">
            <FilterContainer content="circus" props={props} url={`/circus`} />
          </div>
          <CircusContainer props={props} />
        </div>
      </div>
    </>
  );
}
