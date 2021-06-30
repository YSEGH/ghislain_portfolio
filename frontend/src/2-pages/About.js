import React from "react";
import "../1-css/About.css";
import Nav from "./Components/Nav";

export default function About() {
  return (
    <div className="about" id="about">
      <Nav color="black" />
      <div className="text-container">
        <h1>About Me</h1>
        <div className="paragraphe-container">
          <p>
            Consectetur occaecat est sint dolor qui culpa labore enim commodo id
            non deserunt sunt dolor. Eiusmod Lorem cupidatat proident in
            pariatur laboris minim aute fugiat et labore pariatur consectetur.
            Ut commodo mollit aliquip et velit enim consectetur.
          </p>
          <p>
            Amet nulla aute duis incididunt labore nisi pariatur reprehenderit
            quis enim deserunt qui ut. Esse ad officia non adipisicing ut
            consectetur ipsum commodo quis nisi non aliquip.
          </p>
          <p>
            Consectetur occaecat est sint dolor qui culpa labore enim commodo id
            non deserunt sunt dolor. Eiusmod Lorem cupidatat proident in
            pariatur laboris minim aute fugiat et labore pariatur consectetur.
            Ut commodo mollit aliquip et velit enim consectetur. Amet nulla aute
            duis incididunt labore nisi pariatur reprehenderit quis enim
            deserunt qui ut. Esse ad officia non adipisicing ut consectetur
            ipsum commodo quis nisi non aliquip.
          </p>
        </div>
      </div>
      <div className="photo-container">
        <img src="/images/Kooza-7.jpg" alt="ghislain_ramage" />
      </div>
    </div>
  );
}
