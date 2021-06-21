import React from "react";
import "../../1-css/Portfolio.css";
import { MdPhotoCamera } from "react-icons/md";
import { GiBarracksTent } from "react-icons/gi";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h1>Want to see my work ?</h1>
      <div className="buttons-container">
        <button>
          <GiBarracksTent size={40} />
          Circus
        </button>
        <button>
          <MdPhotoCamera size={40} />
          Photography
        </button>
      </div>
    </div>
  );
}
