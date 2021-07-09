import React, { useEffect, useRef, useState } from "react";
import EditorJs from "react-editor-js";
import "../../1-css/FormAddContenu.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import uniqId from "uniqid";
import {
  addItemHandler,
  deleteFileHandler,
  resetItemSuccess,
  updateItemHandler,
} from "../../3-actions/itemActions";
import { LoadingSVG } from "./SmallComponents";
import { EDITOR_JS_TOOLS } from "../../constants";

export default function FormAddContenu({ update = false, item = null }) {
  const addItem = useSelector((state) => state.addItem);
  const { loading: loadingAdd, success: successAdd, error: errorAdd } = addItem;

  const updateItem = useSelector((state) => state.updateItem);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateItem;

  const instanceRef = useRef(null);
  const dispatch = useDispatch();
  const [content, setContent] = useState(item ? item.content : "null");
  const [file, setFile] = useState(item ? item.photos[0] : null);
  const [files, setFiles] = useState(item ? item.photos : []);
  const [type, setType] = useState(item ? item.type : "null");
  const [date, setDate] = useState(item ? item.date : "");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState(item ? item.categorie : []);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    if (event.target.value) {
      setType(event.target.value);
    }
  };

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
    let savedData = null;
    if (instanceRef.current) {
      savedData = await instanceRef.current.save();
    }
    const formData = new FormData();
    let newItem = {
      content: data.content,
      type: data.type ? data.type : "single",
      title: data.title,
      legend: data.legend,
      description: savedData,
      categorie: categories,
      date: data.date ? date : item.date,
      place: data.place,
    };
    if (update) {
      newItem._id = item._id;
    }
    formData.append("item", JSON.stringify(newItem));
    if (content === "circus" && data.type === "group") {
      for (let i = 0; i < files.length; i++) {
        if (files[i].preview) {
          formData.append("files", files[i]);
        }
      }
    } else {
      formData.append("file", file);
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
      setFile(null);
      setFiles([]);
      setCategories([]);
      if (instanceRef.current) {
        instanceRef.current.clear();
      }
    }
    if (successUpdate) {
      dispatch(resetItemSuccess());
      setFilesToDelete([]);
    }
    return () => {};
  }, [successAdd, successUpdate]);

  return (
    <div className="form-add-contenu">
      <select
        {...register("content")}
        defaultValue={update ? item.content : "null"}
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

      {(update || content) && (
        <>
          <form
            id={item ? `form-contenu-${item._id}` : "form-contenu"}
            className="form-contenu"
            onSubmit={handleSubmit(onSubmit)}
          >
            {update ? <h2>Détails</h2> : <h2>Saisissez les détails</h2>}
            {content === "circus" && (
              <select
                {...register("type")}
                defaultValue={update ? item.type : "null"}
                onChange={(e) => handleChange(e)}
              >
                <option value="null" disabled="disabled">
                  Nombre de fichiers ?
                </option>
                <option value="single">Ajouter une image/vidéo</option>
                <option value="group">Ajouter un groupe d'images/videos</option>
              </select>
            )}
            <input
              {...register("title")}
              defaultValue={update ? item.title : ""}
              placeholder="Titre"
            />
            {errors.title && <span>Merci de compléter ce champ.</span>}
            <input
              {...register("legend")}
              defaultValue={update ? item.legend : ""}
              placeholder="Légende"
            />
            {update && <input disabled value={date} />}
            <input
              {...register("date")}
              defaultValue={update ? item.date : ""}
              onChange={(e) => setDateHandler(e.target.value)}
              placeholder="Date"
              type="date"
            />
            <input
              {...register("place")}
              defaultValue={update ? item.place : ""}
              placeholder="Lieu"
            />
            {content !== "photography" && (
              <>
                <h2>Description</h2>
                <div className="text-editor" id="text-editor">
                  <EditorJs
                    instanceRef={(instance) => (instanceRef.current = instance)}
                    tools={EDITOR_JS_TOOLS}
                    data={
                      update
                        ? item.description
                        : { blocks: [], time: "", version: "" }
                    }
                    holder="text-editor"
                  />
                </div>
              </>
            )}
          </form>
          <form
            id={item ? `form-category-${item._id}` : "form-category"}
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
              <button
                type="submit"
                form={item ? `form-category-${item._id}` : "form-category"}
              >
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

          {update || content ? (
            content !== "circus" || type === "single" ? (
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
                    id={item ? `file-${item._id}` : "file"}
                    type="file"
                    {...register("file")}
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        importFile(e.target.files[0]);
                      }
                    }}
                  />
                  <label
                    htmlFor={item ? `file-${item._id}` : "file"}
                    className="drop-zone"
                    onDragLeave={(e) => {
                      e.preventDefault();
                      const dropZone =
                        document.getElementsByClassName("drop-zone")[0];
                      dropZone.classList.remove("active");
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      const dropZone =
                        document.getElementsByClassName("drop-zone")[0];
                      dropZone.classList.add("active");
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const dropZone =
                        document.getElementsByClassName("drop-zone")[0];
                      dropZone.classList.remove("active");
                      importFile(e.dataTransfer.files[0]);
                    }}
                  ></label>
                </div>
              </div>
            ) : content === "circus" && type === "group" ? (
              <div className="upload-zone-container">
                <h2>Importez vos fichiers</h2>
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
                    id={item ? `files-${item._id}` : "files"}
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
                    htmlFor={item ? `files-${item._id}` : "files"}
                    className="drop-zone"
                    onDragLeave={(e) => {
                      e.preventDefault();
                      const dropZone =
                        document.getElementsByClassName("drop-zone")[0];
                      dropZone.classList.remove("active");
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      const dropZone =
                        document.getElementsByClassName("drop-zone")[0];
                      dropZone.classList.add("active");
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const dropZone =
                        document.getElementsByClassName("drop-zone")[0];
                      dropZone.classList.remove("active");
                      importFiles([...e.dataTransfer.files]);
                    }}
                  ></label>
                </div>
              </div>
            ) : null
          ) : null}
          <button
            className="validation-contenu"
            form={item ? `form-contenu-${item._id}` : "form-contenu"}
            type="submit"
            disabled={loadingAdd || loadingUpdate ? true : false}
          >
            {loadingAdd || loadingUpdate ? <LoadingSVG /> : "Valider"}
          </button>
        </>
      )}
    </div>
  );
}
