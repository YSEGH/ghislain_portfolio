import React, { useEffect, useRef, useState } from "react";
import EditorJs from "react-editor-js";
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
import { EDITOR_JS_TOOLS } from "../../constants";
import { toast } from "react-toastify";

export default function FormBlog({ update = false, item }) {
  const dispatch = useDispatch();
  const instanceRef = useRef(null);

  const [file, setFile] = useState(item ? item.photos[0] : null);
  const [date, setDate] = useState(item ? item.date : "");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState(item ? item.categorie : []);

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
    watch,
    reset,
    formState: { errors },
  } = useForm();

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

  const importFile = (fileImport) => {
    const newFile = fileImport;
    const previewFile = Object.assign(newFile, {
      id: uniqId(),
      preview: URL.createObjectURL(newFile),
    });
    setFile(previewFile);
  };

  const setDateHandler = (dateSelected) => {
    const dateFormat = dateSelected.split("T")[0].split("-");
    const newDate = dateFormat[1] + "-" + dateFormat[2] + "-" + dateFormat[0];
    setDate(newDate);
  };

  const onSubmit = async (data) => {
    let savedDescription = await instanceRef.current.save();
    const formData = new FormData();
    let newItem = {
      content: "blog",
      title: data.title,
      addDescription: true,
      description: savedDescription,
      categorie: categories,
      date: data.date ? date : item.date,
      place: data.place,
    };
    if (update) {
      newItem._id = item._id;
    }
    formData.append("item", JSON.stringify(newItem));
    formData.append("file", file);

    if (update) {
      dispatch(updateItemHandler(item._id, formData));
    } else {
      dispatch(addItemHandler(formData));
    }
  };

  useEffect(() => {
    if (successAdd) {
      reset({});
      dispatch(resetItemSuccess());
      setFile(null);
      setCategories([]);
      toast.success("Ajouté avec succés !");
      if (instanceRef.current) {
        instanceRef.current.clear();
      }
    }
    if (successUpdate) {
      dispatch(resetItemSuccess());
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
  }, [successAdd, successUpdate, errorUpdate, errorAdd]);

  return (
    <div className="form-contenu">
      <form id="form-contenu" onSubmit={handleSubmit(onSubmit)}>
        {update ? <h2>Détails</h2> : <h2>Saisissez les détails</h2>}
        <div className="form-group">
          <label>Titre</label>
          <input
            {...register("title")}
            defaultValue={update ? item.title : ""}
            placeholder="Titre"
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
      </form>
      <h2>Rédigez votre article</h2>
      <div className="text-editor" id="text-editor">
        <EditorJs
          instanceRef={(instance) => (instanceRef.current = instance)}
          tools={EDITOR_JS_TOOLS}
          data={
            update ? item.description : { blocks: [], time: "", version: "" }
          }
          holder="text-editor"
        />
      </div>
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
          <h2>Modifiez votre fichier</h2>
        ) : (
          <h2>Importez votre fichier</h2>
        )}

        <div className="apercu-zone one-image">
          {file ? (
            file.type === "video/mp4" ? (
              <video src={file.preview ? file.preview : file.src} />
            ) : (
              <img src={file.preview ? file.preview : file.src} />
            )
          ) : (
            <FaPortrait size={250} />
          )}
        </div>
        <div className="upload-zone">
          <BiImport size={120} />
          <p>Cliquez ou déposez votre fichier ici.</p>
          <input
            id={"file"}
            type="file"
            {...register("file")}
            onChange={(e) => {
              if (e.target.files[0]) {
                importFile(e.target.files[0]);
              }
            }}
          />
          <label
            htmlFor={"file"}
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
              importFile(e.dataTransfer.files[0]);
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
