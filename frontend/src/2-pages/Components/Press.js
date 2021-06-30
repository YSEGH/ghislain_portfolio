import React from "react";
import "../../1-css/Press.css";
import Carrousel from "./Carrousel";

export default function Press() {
  return (
    <div className="press">
      <div className="text-container">
        <h1>They talk about me</h1>
        <p>
          Et ullamco dolore ipsum culpa amet consequat exercitation. Et ullamco
          dolore ipsum culpa amet consequat exercitation.
        </p>
      </div>
      <Carrousel
        classN="press-carousel"
        width={window.innerWidth > 960 ? 640 : window.innerWidth * 0.9}
      />
    </div>
  );
}
