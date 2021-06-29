import React, { useState } from "react";
import "../../1-css/FormAddContenu.css";
import { useForm } from "react-hook-form";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import uniqId from "uniqid";

export default function FormAddContenu({
  update = false,
  itemFile = null,
  itemFiles = [],
  item = { type: "", categories: [] },
}) {
  const [file, setFile] = useState(itemFile);
  const [files, setFiles] = useState(itemFiles);
  const [type, setType] = useState(item.type);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState(item.categories);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const submitCategory = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      const category = categories;
      setCategories([...category, e.target[0].value]);
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

  const onSubmit = (data) => console.log(data);

  return (
    <div className="form-add-contenu">
      <form
        id="form-contenu"
        className="form-contenu"
        onSubmit={handleSubmit(onSubmit)}
      >
        {update ? <h2>Détails</h2> : <h2>Saisissez les détails</h2>}
        {!update && (
          <select
            {...register("type", { required: true })}
            defaultValue="null"
            onChange={(e) => handleChange(e)}
          >
            <option value="null" disabled="disabled">
              Que souhaitez vous faire ?
            </option>
            <option value="oneFile">Ajouter une image/vidéo</option>
            <option value="manyFiles">Ajouter un groupe d'images/videos</option>
            <option value="article">Ajouter un article de blog</option>
          </select>
        )}

        {type === "oneFile" || type === "manyFiles" ? (
          <select {...register("art", { required: true })} defaultValue="null">
            <option value="null" disabled="disabled">
              Séléctionnez le type de contenu
            </option>
            <option value="photography">Photographie</option>
            <option value="circus">Cirque</option>
          </select>
        ) : null}
        <input {...register("title", { required: true })} placeholder="Titre" />
        {errors.title && <span>Merci de compléter ce champ.</span>}
        <input
          {...register("legend", { required: true })}
          placeholder="Légende"
        />

        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
        />
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
      {type ? (
        type === "oneFile" || type === "article" ? (
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
        ) : (
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
                {...register("files", { required: true })}
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
        )
      ) : null}
      <button className="validation-contenu" form="form-contenu" type="submit">
        Valider
      </button>
    </div>
  );
}
