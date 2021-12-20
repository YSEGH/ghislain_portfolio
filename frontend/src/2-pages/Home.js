import React, { useEffect } from "react";
import Banner from "./Components/Banner";
import "../1-css/Home.css";

export default function Home() {
  useEffect(() => {
    document.title = "Ghislain Ramage";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Ghislain Ramage. Professional Cyr wheel artist and photographer as a hobby. This is my website and you can find everything about me there."
      );
    return () => {};
  }, []);
  return (
    <div className="home">
      <Banner />
    </div>
  );
}
