import React from "react";
import About from "./Components/About";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Portfolio from "./Components/Portfolio";
import Press from "./Components/Press";

export default function Home() {
  return (
    <div>
      <Banner />
      <About />
      <Portfolio />
      <Press />
      <Form />
      <Footer />
    </div>
  );
}
