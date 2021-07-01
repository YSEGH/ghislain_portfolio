import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditorJs from "react-editor-js";
import "../../1-css/FormDetails.css";
import { useForm } from "react-hook-form";
import uniqId from "uniqid";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import { EDITOR_JS_TOOLS } from "../../constants";
import {
  getInfosHandler,
  updateInfosHandler,
} from "../../3-actions/infoActions";

export default function FormDetails() {
  const dispatch = useDispatch();
  const updateInfos = useSelector((state) => state.updateInfos);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateInfos;

  const getInfos = useSelector((state) => state.getInfos);
  const { loading: loadingGet, data, error: errorGet } = getInfos;

  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const instanceRef = useRef(null);

  const importFile = (fileImport) => {
    const image = fileImport;
    const newFile = Object.assign(image, {
      id: uniqId(),
      preview: URL.createObjectURL(image),
    });
    setFile(newFile);
  };

  const onSubmit = async (dataForm) => {
    const savedData = await instanceRef.current.save();
    const infos = {
      lastname: dataForm.lastname ? dataForm.lastname : data.lastname,
      firstname: dataForm.firstname ? dataForm.firstname : data.firstname,
      email: dataForm.email ? dataForm.email : data.email,
      phone: dataForm.phone ? dataForm.phone : data.phone,
      city: dataForm.city ? dataForm.city : data.city,
      country: dataForm.country ? dataForm.country : data.country,
      facebook: dataForm.facebook ? dataForm.facebook : data.facebook,
      instagram: dataForm.instagram ? dataForm.instagram : data.instagram,
      twitter: dataForm.twitter ? dataForm.twitter : data.twitter,
      aboutDescription: savedData,
    };
    const formData = new FormData();
    formData.append("infos", JSON.stringify(infos));
    formData.append("image", file);
    dispatch(updateInfosHandler(formData));
  };

  useEffect(() => {
    dispatch(getInfosHandler());
    return () => {};
  }, []);

  return (
    <div className="details">
      <form
        id="form-details"
        className="form-details"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Saisissez les infos générales</h2>
        <input
          {...register("lastname")}
          placeholder="Nom"
          defaultValue={data.lastname}
        />
        <input
          {...register("firstname")}
          placeholder="Prénom"
          defaultValue={data.firstname}
        />
        <input
          {...register("email")}
          placeholder="Email"
          defaultValue={data.email}
        />
        <input
          {...register("phone")}
          placeholder="Téléphone"
          defaultValue={data.phone}
        />
        <input
          {...register("city")}
          placeholder="Ville"
          defaultValue={data.city}
        />
        <input
          {...register("country")}
          placeholder="Pays"
          defaultValue={data.country}
        />
      </form>
      <div className="upload-zone-container">
        <h2>Modifiez l'image de présentation</h2>
        <div className="apercu-zone one-image">
          {!file ? (
            <img src={data.aboutPhoto} />
          ) : file.type === "video/mp4" ? (
            <video src={file.preview} />
          ) : (
            <img src={file.preview} />
          )}
        </div>
        <div className="upload-zone">
          <BiImport size={120} />
          <p>Cliquez ou déposez votre fichier ici.</p>
          <input
            id="file"
            type="file"
            {...register("file")}
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
        <div className="text-editor">
          {data.aboutDescription && (
            <EditorJs
              instanceRef={(instance) => (instanceRef.current = instance)}
              tools={EDITOR_JS_TOOLS}
              data={data.aboutDescription}
            />
          )}
        </div>
      </div>
      <button form="form-details">Valider les modifications</button>
    </div>
  );
}
