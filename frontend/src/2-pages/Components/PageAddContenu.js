import React, { useState } from "react";
import "../../1-css/PageContenu.css";

import FormBlog from "./FormBlog";
import FormCircus from "./FormCircus";
import FormPhotos from "./FormPhotos";

export default function PageAddContenu() {
  const [content, setContent] = useState(null);

  return (
    <div className="page-add-contenu">
      <h2>Que souhaitez-vous ajouter ?</h2>
      <div className="form-group">
        <select
          defaultValue={"null"}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        >
          <option value="null" disabled="disabled">
            Que souhaitez vous ajouter ?
          </option>
          <option value="circus">Cirque</option>
          <option value="photography">Photographie</option>
          <option value="blog">Blog</option>
          <option value="press">Presse</option>
        </select>
      </div>
      <div className="form-container">
        {content === "circus" ? (
          <FormCircus />
        ) : content === "photography" ? (
          <FormPhotos />
        ) : content === "blog" ? (
          <FormBlog />
        ) : null}
      </div>
    </div>
  );
}
