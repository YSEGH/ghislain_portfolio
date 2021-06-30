import React, { useState } from "react";
import "../../1-css/FormDetails.css";
import { useForm } from "react-hook-form";
import uniqId from "uniqid";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import TextEditor from "./TextEditor";
import { LoadingSpinnerFixed, SuccessUpdate } from "./SmallComponents";

export default function FormDetails() {
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const importFile = (fileImport) => {
    const image = fileImport;
    const newFile = Object.assign(image, {
      id: uniqId(),
      preview: URL.createObjectURL(image),
    });
    setFile(newFile);
  };

  const onSubmit = (data) => console.log(data);

  return (
    <div className="details">
      <form
        id="form-details"
        className="form-details"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Saisissez les infos générales</h2>
        <input
          {...register("lastName", { required: true })}
          placeholder="Nom"
        />
        <input
          {...register("firstName", { required: true })}
          placeholder="Prénom"
        />
        <input {...register("email", { required: true })} placeholder="Email" />
        <input
          {...register("phone", { required: true })}
          placeholder="Téléphone"
        />
        <input {...register("place", { required: true })} placeholder="Ville" />
        <input
          {...register("country", { required: true })}
          placeholder="Pays"
        />
        <button>Valider les modifications</button>
      </form>
      <div className="upload-zone-container">
        <h2>Modifiez l'image de présentation</h2>
        <div className="apercu-zone one-image">
          {file ? (
            file.type === "video/mp4" ? (
              <video src={file.preview} />
            ) : (
              <img src={file.preview} />
            )
          ) : (
            <FaPortrait size={250} />
          )}
        </div>
        <div className="upload-zone">
          <BiImport size={120} />
          <p>Cliquez ou déposez votre fichier ici.</p>
          <input
            id="file"
            type="file"
            {...register("file", { required: true })}
            onChange={(e) => {
              if (e.target.files[0]) {
                importFile(e.target.files[0]);
              }
            }}
          />
          <label
            htmlFor="file"
            className="drop-zone"
            onDragLeave={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
              console.log("File is out zone");
            }}
            onDragOver={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.add("active");
              console.log("File is over zone");
            }}
            onDrop={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
              console.log("File is in the zone");
              importFile(e.dataTransfer.files[0]);
            }}
          ></label>
        </div>
      </div>
      <div className="presentation-details">
        <h2>Modifiez le texte de présentation</h2>
        <TextEditor />
      </div>
    </div>
  );
}
