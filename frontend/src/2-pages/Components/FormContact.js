import React from "react";
import "../../1-css/FormContact.css";

export default function FormContact() {
  return (
    <form className="form-contact">
      <div className="inputs-container">
        <input name="" placeholder="Name" />
        <input name="" placeholder="Email" />
      </div>
      <div className="inputs-container">
        <input name="" placeholder="Phone" />
        <input name="" placeholder="Company" />
      </div>
      <textarea name="" placeholder="Message" />
      <button>Send</button>
    </form>
  );
}
