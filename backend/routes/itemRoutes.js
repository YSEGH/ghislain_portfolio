import express from "express";
import Item from "../models/Item.js";
import multer from "multer";
import { deleteFiles, uploadFiles } from "../s3.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  upload.fields([{ name: "file" }, { name: "files" }]),
  async (req, res) => {
    let result;
    let photos = [];

    const itemAdd = JSON.parse(req.body.item);
    const item = new Item({
      type: itemAdd.type,
      content: itemAdd.content,
      title: itemAdd.title,
      legend: itemAdd.legend,
      categorie: itemAdd.categorie,
      description: itemAdd.description
        ? itemAdd.description
        : { blocks: [], time: "", version: "" },
      date: itemAdd.date,
      place: itemAdd.place,
    });

    /* Importation des fichiers */
    if (req.files.file) {
      try {
        result = await uploadFiles(req.files.file[0]);
        photos.push({
          src: `/api/files/${result.Key}`,
          type: req.files.file[0].mimetype,
        });
        Object.assign(item, { photos: photos });
      } catch (error) {
        return res
          .status(400)
          .send({ message: "Impossible d'importer le fichier." });
      }
    } else if (req.files.files) {
      try {
        for (let i = 0; i < req.files.files.length; i++) {
          const file = req.files.files[i];
          result = await uploadFiles(file);
          photos.push({
            src: `/api/files/${result.Key}`,
            type: file.mimetype,
          });
        }
        Object.assign(item, { photos: photos });
      } catch (error) {
        return res
          .status(400)
          .send({ message: "Impossible d'importer les fichiers." });
      }
    }
    try {
      await item.save();
      return res.status(200).send({ message: "Ajout effectué avec succés." });
    } catch (error) {
      return res.status(400).send({ message: "Ajout impossible." });
    }
  }
);

router.get("/:contentType", async (req, res) => {
  let filteredItems = [];
  let items = [];
  try {
    items = await Item.find({ content: req.params.contentType });

    if (req.query.filters) {
      filteredItems = items.filter((item, i) => {
        let filterCheck = req.query.filters.every((v) =>
          item.categorie.includes(v)
        );
        if (filterCheck) {
          return item;
        }
        return;
      });
    } else {
      filteredItems = items;
    }

    return res.status(200).send(filteredItems);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de récupérer les données." });
  }
});

router.get("/filters/:contentType", async (req, res) => {
  let filters = [];
  try {
    const items = await Item.find({ content: req.params.contentType });

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.categorie.map((cate, i) => {
        const cateExist = filters.find(
          (x) => x.name.toLowerCase() === cate.toLowerCase()
        );
        if (cateExist) {
          filters.map((filter) =>
            filter.name === cate ? { ...filter, qty: filter.qty++ } : filter
          );
        } else {
          filters.push({ name: cate.toLowerCase(), qty: 1 });
        }
      });
    }
    return res.status(200).send(filters);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de récupérer les filtres." });
  }
});

router.put("/", async (req, res) => {
  try {
    const item = await Item.findById(req.body.id);
    item.type = req.body.type;
    item.content = req.body.content;
    item.title = req.body.title;
    item.legend = req.body.legend;
    item.categorie = req.body.categorie;
    item.photos = req.body.photos;
    item.description = req.body.description;
    item.date = req.body.date;
    item.place = req.body.place;
    await item.save();
    return res
      .status(200)
      .send({ message: "Les modifications ont été enregistrées." });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de sauvegarder les modifications." });
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    /* Suppression des fichiers */
    if (item.type === "single") {
      const oldFileKey = item.photo.src.split("/")[3];
      try {
        const deleteResult = await deleteFiles(oldFileKey);
      } catch (error) {
        return res
          .status(400)
          .send({ message: `Impossible de supprimer le fichier.` });
      }
    } else if (item.type === "group") {
      try {
        for (let i = 0; i < item.photos; i++) {
          const file = item.photos[i];
          const oldFileKey = file.src.split("/")[3];
          const deleteResult = await deleteFiles(oldFileKey);
        }
      } catch (error) {
        return res
          .status(400)
          .send({ message: "Impossible de supprimer les fichiers." });
      }
    }
    /* Suppression de l'item de la BDD */
    await item.remove();
    return res
      .status(200)
      .send({ message: "Suppression effectuée avec succés." });
  } catch (error) {
    return res.status(400).send({ message: "Suppression impossible." });
  }
});

export default router;
