import React from "react";
import Banner from "./Components/Banner";
import Form from "./Components/Form";
import Portfolio from "./Components/Portfolio";
import Press from "./Components/Press";

export default function Home() {
  return (
    <div>
      <Banner />
      <Portfolio />
      {/*       <Press />
       */}
      <Form />
    </div>
  );
}
