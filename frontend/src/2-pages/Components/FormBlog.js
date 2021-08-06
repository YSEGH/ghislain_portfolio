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
  getItemsHandler,
  resetItemSuccess,
  updateItemHandler,
} from "../../3-actions/itemActions";
import { LoadingSVG } from "./SmallComponents";
import { EDITOR_JS_TOOLS } from "../../constants";
import { toast } from "react-toastify";

export default function FormBlog({ update = false, item }) {
  const [files, setFiles] = useState(item ? item.photos : []);
  const [date, setDate] = useState(item ? item.date : "");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState(item ? item.categorie : []);
  const [filesToDelete, setFilesToDelete] = useState([]);

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
  const dispatch = useDispatch();
  const instanceRef = useRef(null);

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

  const setDateHandler = (dateSelected) => {
    const dateFormat = dateSelected.split("T")[0].split("-");
    const newDate = dateFormat[1] + "/" + dateFormat[2] + "/" + dateFormat[0];
    setDate(newDate);
  };

  const onSubmit = async (data) => {
    let savedDescription = await instanceRef.current.save();
    const formData = new FormData();
    let newItem = {
      content: "blog",
      title: data.title,
      description: savedDescription,
      categorie: categories,
      date: data.date ? date : item.date,
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
      setCategories([]);
      if (instanceRef.current) {
        instanceRef.current.clear();
      }
      dispatch(resetItemSuccess());
    }
    if (successUpdate) {
      toast.success("Modifications enregistrées !");
      setFilesToDelete([]);
      dispatch(resetItemSuccess());
      dispatch(getItemsHandler(null, null, null, null, item._id));
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
        {update ? <h2>Blog</h2> : <h2>Saisissez les détails</h2>}
        <div className="form-group">
          <label>Titre</label>
          <input
            {...register("title", { required: !update ? true : false })}
            defaultValue={update ? item.title : ""}
            placeholder="Titre"
          />
          {errors.title && (
            <span className="danger">Merci de saisir un titre.</span>
          )}
        </div>
        <div className="form-group">
          <label>Lieu</label>
          <input
            {...register("place", { required: !update ? true : false })}
            defaultValue={update ? item.place : ""}
            placeholder="Lieu"
          />
          {errors.place && (
            <span className="danger">Merci de saisir un lieu.</span>
          )}
        </div>
        <div className="form-group">
          <label>Date</label>
          {update && <input disabled value={date} />}
          <input
            {...register("date", { required: !update ? true : false })}
            defaultValue={update ? item.date : ""}
            onChange={(e) => setDateHandler(e.target.value)}
            placeholder="Date"
            type="date"
          />
          {errors.date && (
            <span className="danger">Merci de saisir une date.</span>
          )}
        </div>
      </form>

      <form
        id={"form-category"}
        className="form-category"
        onSubmit={(e) => submitCategory(e)}
      >
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
