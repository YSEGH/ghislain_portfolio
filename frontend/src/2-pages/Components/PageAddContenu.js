import React, { useState } from "react";
import "../../1-css/PageContenu.css";
import FormAgenda from "./FormAgenda";
import FormBlog from "./FormBlog";
import FormCircus from "./FormCircus";
import FormPhotos from "./FormPhotos";
import FormProject from "./FormProject";

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
          <option value="project">Projet</option>
          <option value="agenda">Agenda</option>
        </select>
      </div>
      <div className="form-container">
        {content === "circus" ? (
          <FormCircus />
        ) : content === "photography" ? (
          <FormPhotos />
        ) : content === "blog" ? (
          <FormBlog />
        ) : content === "project" ? (
          <FormProject />
        ) : content === "agenda" ? (
          <FormAgenda />
        ) : null}
      </div>
    </div>
  );
}
