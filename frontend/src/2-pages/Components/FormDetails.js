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
  resetInfos,
  updateInfosHandler,
} from "../../3-actions/infoActions";
import { LoadingSVG } from "./SmallComponents";
import { toast } from "react-toastify";

export default function FormDetails() {
  const instanceRef = useRef(null);

  const dispatch = useDispatch();
  const updateInfos = useSelector((state) => state.updateInfos);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateInfos;

  const getInfos = useSelector((state) => state.getInfos);
  const { loading: loadingGet, infos, error: errorGet } = getInfos;

  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  const onSubmit = async (dataForm) => {
    const savedData = await instanceRef.current.save();
    const infosUpdated = {
      lastname: dataForm.lastname ? dataForm.lastname : infos.lastname,
      firstname: dataForm.firstname ? dataForm.firstname : infos.firstname,
      email: dataForm.email ? dataForm.email : infos.email,
      phone: dataForm.phone ? dataForm.phone : infos.phone,
      city: dataForm.city ? dataForm.city : infos.city,
      country: dataForm.country ? dataForm.country : infos.country,
      facebook: dataForm.facebook ? dataForm.facebook : infos.facebook,
      instagram: dataForm.instagram ? dataForm.instagram : infos.instagram,
      twitter: dataForm.twitter ? dataForm.twitter : infos.twitter,
      aboutDescription: savedData,
    };
    const formData = new FormData();
    formData.append("infos", JSON.stringify(infosUpdated));
    formData.append("image", file);
    dispatch(updateInfosHandler(formData));
  };

  useEffect(() => {
    if (Object.keys(infos).length === 0) {
      dispatch(getInfosHandler());
    }
    if (successUpdate) {
      toast.success("Modifications enregistrées !");
      dispatch(resetInfos());
    }
    if (errorUpdate) {
      toast.error("Impossible d'enregistrer les modifications !");
      dispatch(resetInfos());
    }
    return () => {};
  }, [successUpdate, errorUpdate]);

  return (
    <div className="details">
      <form
        id="form-details"
        className="form-details"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Saisissez les infos générales</h2>
        <div className="form-group">
          <label>Nom</label>
          <input
            {...register("lastname")}
            placeholder="Nom"
            defaultValue={infos.lastname}
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            {...register("firstname")}
            placeholder="Prénom"
            defaultValue={infos.firstname}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            {...register("email")}
            placeholder="Email"
            defaultValue={infos.email}
          />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input
            {...register("phone")}
            placeholder="Téléphone"
            defaultValue={infos.phone}
          />
        </div>
        <div className="form-group">
          <label>Ville</label>
          <input
            {...register("city")}
            placeholder="Ville"
            defaultValue={infos.city}
          />
        </div>
        <div className="form-group">
          <label>Pays</label>
          <input
            {...register("country")}
            placeholder="Pays"
            defaultValue={infos.country}
          />
        </div>
        <div className="form-group">
          <label>Facebook</label>
          <input
            {...register("facebook")}
            placeholder="Facebook"
            defaultValue={infos.facebook}
          />
        </div>
        <div className="form-group">
          <label>Instagram</label>
          <input
            {...register("instagram")}
            placeholder="Instagram"
            defaultValue={infos.instagram}
          />
        </div>
      </form>
      <div className="upload-zone-container">
        <h2>Modifiez l'image de présentation</h2>
        <div className="apercu-zone one-image">
          {!file ? (
            <img src={infos.aboutPhoto} />
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
          {infos.aboutDescription && (
            <EditorJs
              instanceRef={(instance) => (instanceRef.current = instance)}
              tools={EDITOR_JS_TOOLS}
              data={infos.aboutDescription}
            />
          )}
        </div>
      </div>
      <button
        form="form-details"
        type="submit"
        disabled={loadingUpdate ? true : false}
      >
        {loadingUpdate ? <LoadingSVG /> : "Valider les modifications"}
      </button>
    </div>
  );
}
