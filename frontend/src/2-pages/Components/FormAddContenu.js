import React, { useEffect, useRef, useState } from "react";
import EditorJs from "react-editor-js";
import "../../1-css/FormAddContenu.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import uniqId from "uniqid";
import { addItemHandler, resetItemSuccess } from "../../3-actions/itemActions";
import { LoadingSVG } from "./SmallComponents";
import { EDITOR_JS_TOOLS } from "../../constants";

export default function FormAddContenu({
  update = false,
  itemFile = null,
  itemFiles = [],
  item = { type: "", categories: [], content: null },
}) {
  const addItem = useSelector((state) => state.addItem);
  const { loading: loadingAdd, success: successAdd, error: errorAdd } = addItem;

  const instanceRef = useRef(null);
  const dispatch = useDispatch();
  const [content, setContent] = useState(item.content);
  const [file, setFile] = useState(itemFile);
  const [files, setFiles] = useState(itemFiles);
  const [type, setType] = useState(item.type);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState(item.categories);
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
    const image = fileImport;
    const newFile = Object.assign(image, {
      id: uniqId(),
      preview: URL.createObjectURL(image),
    });
    setFile(newFile);
  };

  const importFiles = (filesImport) => {
    const oldImages = files;
    const images = filesImport;
    const newFiles = images.map((image, i) => {
      return Object.assign(image, {
        id: uniqId(),
        preview: URL.createObjectURL(image),
      });
    });
    setFiles(oldImages.concat(newFiles));
  };

  const deleteFile = (id) => {
    const images = files.filter((file) => file.id !== id);
    setFiles(images);
  };

  const onSubmit = async (data) => {
    let savedData = null;
    if (instanceRef.current) {
      savedData = await instanceRef.current.save();
    }
    const formData = new FormData();
    const item = {
      content: data.content,
      type:
        content === "circus" && data.type
          ? data.type === "oneFile"
            ? "single"
            : "group"
          : "single",
      title: data.title,
      legend: data.legend,
      description: savedData,
      categorie: categories,
      date: data.date,
      place: data.place,
    };
    formData.append("item", JSON.stringify(item));
    if (content === "circus" && data.type === "manyFiles") {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    } else {
      formData.append("file", file);
    }

    dispatch(addItemHandler(formData));
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
    return () => {};
  }, [successAdd]);

  return (
    <div className="form-add-contenu">
      <select
        {...register("content")}
        defaultValue="null"
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
            id="form-contenu"
            className="form-contenu"
            onSubmit={handleSubmit(onSubmit)}
          >
            {update ? <h2>Détails</h2> : <h2>Saisissez les détails</h2>}
            {!update && content === "circus" && (
              <select
                {...register("type")}
                defaultValue="null"
                onChange={(e) => handleChange(e)}
              >
                <option value="null" disabled="disabled">
                  Nombre de fichiers ?
                </option>
                <option value="oneFile">Ajouter une image/vidéo</option>
                <option value="manyFiles">
                  Ajouter un groupe d'images/videos
                </option>
              </select>
            )}
            <input
              {...register("title", { required: true })}
              placeholder="Titre"
            />
            {errors.title && <span>Merci de compléter ce champ.</span>}
            <input
              {...register("legend", { required: true })}
              placeholder="Légende"
            />
            <input
              {...register("date", { required: true })}
              placeholder="Date"
              type="date"
            />
            <input
              {...register("place", { required: true })}
              placeholder="Lieu"
            />
            {content !== "photography" && (
              <div className="text-editor">
                <EditorJs
                  instanceRef={(instance) => (instanceRef.current = instance)}
                  tools={EDITOR_JS_TOOLS}
                  data={{}}
                />
              </div>
            )}
          </form>
          <form id="form-category" onSubmit={(e) => submitCategory(e)}>
            <div className="category-input-container">
              <input
                value={categoryName}
                className="category-input"
                placeholder="Catégories"
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <button type="submit" form="form-category">
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
            content !== "circus" || type === "oneFile" ? (
              <div className="upload-zone-container">
                {update ? (
                  <h2>Modifiez votre fichier</h2>
                ) : (
                  <h2>Importez votre fichier</h2>
                )}

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
            ) : content === "circus" && type === "manyFiles" ? (
              <div className="upload-zone-container">
                <h2>Importez vos fichiers</h2>
                <div className="apercu-zone many-images">
                  {files.length > 0 ? (
                    files.map((file, i) =>
                      file.type === "video/mp4" ? (
                        <video
                          key={i}
                          src={file.preview}
                          onClick={() => deleteFile(file.id)}
                        />
                      ) : (
                        <img
                          key={i}
                          src={file.preview}
                          onClick={() => deleteFile(file.id)}
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
                    id="file"
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
                    htmlFor="file"
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
            form="form-contenu"
            type="submit"
            disabled={loadingAdd ? true : false}
          >
            {loadingAdd ? <LoadingSVG /> : "Valider"}
          </button>
        </>
      )}
    </div>
  );
}
