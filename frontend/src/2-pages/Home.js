import React from "react";
import Banner from "./Components/Banner";
import Form from "./Components/Form";
import Portfolio from "./Components/Portfolio";
import Press from "./Components/Press";
import Footer from "./Components/Footer";
import "../1-css/Home.css";

export default function Home() {
  return (
    <div className="home">
      <Banner />
      <Portfolio />
      <Press />

      <Form />
      <Footer />
    </div>
  );
}
