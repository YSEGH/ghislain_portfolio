import React from "react";
import "../../1-css/Form.css";
import FormContact from "./FormContact";

export default function Form() {
  return (
    <div className="form part" id="contact">
      <h1>Let's keep in touch</h1>
      <p>
        If you would like to contact me, please send me a message and I will
        reply as soon as possible.
      </p>
      <FormContact />
    </div>
  );
}
