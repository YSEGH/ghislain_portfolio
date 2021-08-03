import React, { useEffect, useState } from "react";
import "../../1-css/FormContenu.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import uniqId from "uniqid";
import {
  addItemHandler,
  getItemsHandler,
  resetItemSuccess,
  updateItemHandler,
} from "../../3-actions/itemActions";
import { LoadingSVG } from "./SmallComponents";
import { toast } from "react-toastify";

export default function FormAgenda({ update = false, item }) {
  const [files, setFiles] = useState(item ? item.photos : []);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [beginDate, setBeginDate] = useState(
    item ? item.date.split("-")[0] : ""
  );
  const [endDate, setEndDate] = useState(item ? item.date.split("-")[1] : "");

  const addItem = useSelector((state) => state.addItem);
  const { loading: loadingAdd, success: successAdd, error: errorAdd } = addItem;

  const updateItem = useSelector((state) => state.updateItem);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateItem;

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const importFiles = (filesImport) => {
    if (files.length >= 1) {
      toast.error(`Vous ne pouvez importer qu'une image.`);
      return;
    }
    if (filesImport[0].type.split("/")[0] !== "image") {
      toast.error(`Vous ne pouvez pas importer de vidéo.`);
      return;
    }
    const oldFiles = files;
    const newfiles = filesImport;
    const previewFile = newfiles.filter((image, i) => {
      if (image.type.split("/")[0] === "image" && image.size > 1000000) {
        toast.error(
          `${image.name} est trop volumineux (+1Mo). Compression requise.`
        );
        return;
      } else {
        return Object.assign(image, {
          id: uniqId(),
          imported: false,
          preview: URL.createObjectURL(image),
        });
      }
    });
    setFiles(oldFiles.concat(previewFile));
  };

  const setDateHandler = (dateSelected, type) => {
    const dateFormat = dateSelected.split("T")[0].split("-");
    const newDate = dateFormat[1] + "/" + dateFormat[2] + "/" + dateFormat[0];

    if (type === "debut") {
      setBeginDate(newDate);
    } else {
      setEndDate(newDate);
    }
  };

  const deleteFile = (fileDelete) => {
    let newFiles;
    if (fileDelete.imported === false) {
      newFiles = files.filter((file) => file.id !== fileDelete.id);
    } else {
      setFilesToDelete([...filesToDelete, fileDelete]);
      newFiles = files.filter((file) => file.src !== fileDelete.src);
    }
    setFiles(newFiles);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    let newItem = {
      content: "agenda",
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      date: `${beginDate} - ${endDate}`,
      place: data.place,
    };
    if (update) {
      newItem._id = item._id;
    }
    formData.append("item", JSON.stringify(newItem));
    for (let i = 0; i < files.length; i++) {
      if (!files[i].imported) {
        formData.append("files", files[i]);
      }
    }

    if (update) {
      dispatch(updateItemHandler(item._id, formData, filesToDelete));
    } else {
      dispatch(addItemHandler(formData));
    }
  };

  useEffect(() => {
    if (successAdd) {
      toast.success("Ajouté avec succés !");
      reset({});
      setFiles([]);
      dispatch(resetItemSuccess());
    }
    if (successUpdate) {
      toast.success("Modifications enregistrées !");
      setFilesToDelete([]);
      dispatch(resetItemSuccess());
      dispatch(getItemsHandler(null, null, null, null, item._id));
    }
    if (errorAdd) {
      toast.error(errorAdd);
      dispatch(resetItemSuccess());
    }
    if (errorUpdate) {
      toast.error("Impossible d'enregistrer les modifications !");
      dispatch(resetItemSuccess());
    }
    return () => {};
  }, [successAdd, successUpdate, errorAdd, errorUpdate]);

  return (
    <div className="form-contenu">
      <form id="form-contenu" onSubmit={handleSubmit(onSubmit)}>
        {update ? <h2>Agenda</h2> : <h2>Saisissez les détails</h2>}
        <div className="form-group">
          <label>Titre</label>
          <input
            {...register("title")}
            defaultValue={update ? item.title : ""}
            placeholder="Ex. Cirque du soleil, Voyage"
          />
        </div>
        <div className="form-group">
          <label>Sous-titre</label>
          <input
            {...register("subtitle")}
            defaultValue={update ? item.subtitle : ""}
            placeholder="Ex. Kooza, Road Trip Photo"
          />
        </div>
        <div className="form-group">
          <label>Lieu</label>
          <input
            {...register("place")}
            defaultValue={update ? item.place : ""}
            placeholder="Lieu"
          />
        </div>
        <div className="form-group">
          <label>Présentation</label>
          <textarea
            {...register("description")}
            defaultValue={update ? item.description : ""}
            placeholder=""
          />
        </div>
        <div className="form-group">
          <label>Date de début</label>
          {update && <input disabled value={beginDate} />}
          <input
            onChange={(e) => setDateHandler(e.target.value, "debut")}
            type="date"
          />
        </div>
        <div className="form-group">
          <label>Date de fin</label>
          {update && <input disabled value={endDate} />}
          <input
            onChange={(e) => setDateHandler(e.target.value, "fin")}
            type="date"
          />
        </div>
      </form>

      <div className="upload-zone-container">
        {update ? (
          <h2>Modifiez votre fichier</h2>
        ) : (
          <h2>Importez votre fichier</h2>
        )}
        <div className="apercu-zone one-image">
          {files.length > 0 ? (
            <img
              src={files[0].preview ? files[0].preview : files[0].src}
              onClick={() => deleteFile(files[0])}
            />
          ) : (
            <FaPortrait size={250} />
          )}
        </div>
        <div className="upload-zone">
          <BiImport size={120} />
          <p>Cliquez ou déposez votre fichiers ici.</p>
          <input
            id={"files"}
            type="file"
            {...register("files")}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                importFiles([...e.target.files]);
              }
            }}
          />
          <label
            htmlFor={"files"}
            className="drop-zone"
            onDragLeave={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
            }}
            onDragOver={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.add("active");
            }}
            onDrop={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
              importFiles([...e.dataTransfer.files]);
            }}
          ></label>
        </div>
      </div>

      <button
        className="validation-contenu"
        form={"form-contenu"}
        type="submit"
        disabled={loadingAdd || loadingUpdate ? true : false}
      >
        {loadingAdd || loadingUpdate ? <LoadingSVG /> : "Valider"}
      </button>
    </div>
  );
}
