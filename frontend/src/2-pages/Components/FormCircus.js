import React, { useEffect, useState } from "react";
import "../../1-css/FormContenu.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import uniqId from "uniqid";
import {
  addItemHandler,
  resetItemSuccess,
  updateItemHandler,
} from "../../3-actions/itemActions";
import { LoadingSVG } from "./SmallComponents";
import { toast } from "react-toastify";

export default function FormCircus({ update = false, item }) {
  const addItem = useSelector((state) => state.addItem);
  const { loading: loadingAdd, success: successAdd, error: errorAdd } = addItem;

  const updateItem = useSelector((state) => state.updateItem);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateItem;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [files, setFiles] = useState(item ? item.photos : []);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState(item ? item.categorie : []);
  const [date, setDate] = useState(item ? item.date : "");
  const [filesToDelete, setFilesToDelete] = useState([]);

  const submitCategory = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      const category = categories;
      setCategories([...category, e.target[0].value.toLowerCase()]);
      setCategoryName("");
    }
  };
  const removeCategory = (name) => {
    const category = categories.filter((item) => item !== name);
    setCategories(category);
  };

  const importFiles = (filesImport) => {
    const oldFiles = files;
    const newfiles = filesImport;
    const previewFile = newfiles.map((image, i) => {
      return Object.assign(image, {
        id: uniqId(),
        preview: URL.createObjectURL(image),
      });
    });
    setFiles(oldFiles.concat(previewFile));
  };

  const deleteFile = (fileDelete) => {
    let newFiles;
    if (fileDelete.preview) {
      newFiles = files.filter((file) => file.id !== fileDelete.id);
    } else {
      setFilesToDelete([...filesToDelete, fileDelete]);
      newFiles = files.filter((file) => file.src !== fileDelete.src);
    }
    setFiles(newFiles);
  };

  const setDateHandler = (dateSelected) => {
    const dateFormat = dateSelected.split("T")[0].split("-");
    const newDate = dateFormat[1] + "-" + dateFormat[2] + "-" + dateFormat[0];
    setDate(newDate);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    let newItem = {
      content: "circus",
      title: data.title,
      legend: data.legend,
      categorie: categories,
      date: data.date ? date : item.date,
      place: data.place,
    };
    if (update) {
      newItem._id = item._id;
    }
    formData.append("item", JSON.stringify(newItem));
    for (let i = 0; i < files.length; i++) {
      if (files[i].preview) {
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
      reset({});
      dispatch(resetItemSuccess());
      setFiles([]);
      setCategories([]);
      toast.success("Ajouté avec succés !");
    }
    if (successUpdate) {
      dispatch(resetItemSuccess());
      setFilesToDelete([]);
      toast.success("Modifications enregistrées !");
    }
    if (errorAdd) {
      toast.error("Ajout impossible !");
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
        {update ? <h2>Détails</h2> : <h2>Saisissez les détails</h2>}
        <div className="form-group">
          <label>Nom</label>
          <input
            {...register("title")}
            defaultValue={update ? item.title : ""}
            placeholder="Nom du cirque"
          />
        </div>
        {errors.title && <span>Merci de compléter ce champ.</span>}

        <div className="form-group">
          <label>Date</label>
          {update && <input disabled value={date} />}
          <input
            {...register("date")}
            defaultValue={update ? item.date : ""}
            onChange={(e) => setDateHandler(e.target.value)}
            placeholder="Date"
            type="date"
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
          <label>Légende</label>
          <textarea
            {...register("legend")}
            rows={8}
            defaultValue={update ? item.legend : ""}
          />
        </div>
      </form>
      <form id={"form-category"} onSubmit={(e) => submitCategory(e)}>
        <h2>Catégories</h2>
        <div className="category-input-container">
          <input
            value={categoryName}
            className="category-input"
            placeholder="Catégories"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button type="submit" form={"form-category"}>
            +
          </button>
        </div>
        <div className="categories-container">
          {categories.map((item, i) => (
            <span onClick={() => removeCategory(item)} key={i}>
              {item}
            </span>
          ))}
        </div>
      </form>
      <div className="upload-zone-container">
        {update ? (
          <h2>Modifiez vos fichiers</h2>
        ) : (
          <h2>Importez vos fichiers</h2>
        )}
        <div className="apercu-zone many-images">
          {files.length > 0 ? (
            files.map((file, i) =>
              file.type === "video/mp4" ? (
                <video
                  key={i}
                  src={file.preview ? file.preview : file.src}
                  onClick={() => deleteFile(file)}
                />
              ) : (
                <img
                  key={i}
                  src={file.preview ? file.preview : file.src}
                  onClick={() => deleteFile(file)}
                />
              )
            )
          ) : (
            <FaPortrait size={250} />
          )}
        </div>
        <div className="upload-zone">
          <BiImport size={120} />
          <p>Cliquez ou déposez vos fichiers ici.</p>
          <input
            id={"files"}
            type="file"
            multiple
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
