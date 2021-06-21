import React from "react";
import Category from "./Category";
import About from "./Components/About";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Portfolio from "./Components/Portfolio";
import Press from "./Components/Press";

export default function Home() {
  return (
    <div>
      <Category />
      <Banner />
      <About />
      <Portfolio />
      <Press />
      <Form />
      <Footer />
    </div>
  );
}
