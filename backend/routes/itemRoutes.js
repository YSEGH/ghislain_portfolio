import express from "express";
import Item from "../models/Item.js";
import multer from "multer";
import { deleteFiles, uploadFiles } from "../s3.js";
import { isAuth } from "../middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  isAuth,
  upload.fields([{ name: "file" }, { name: "files" }]),
  async (req, res) => {
    let result;
    const itemAdd = JSON.parse(req.body.item);

    /* Importation des fichiers */
    try {
      if (req.files.file) {
        const item = new Item({
          content: itemAdd.content,
          title: itemAdd.title,
          legend: itemAdd.legend ? itemAdd.legend : "",
          categorie: itemAdd.categorie,
          description: itemAdd.description
            ? itemAdd.description
            : { blocks: [], time: "", version: "" },
          date: itemAdd.date,
          place: itemAdd.place,
        });
        result = await uploadFiles(req.files.file[0]);
        const photos = [
          {
            src: `/api/files/${result.Key}`,
            type: req.files.file[0].mimetype,
          },
        ];
        Object.assign(item, { photos: photos });
        await item.save();
        return res.status(200).send({ message: "Ajout effectué avec succés." });
      } else if (req.files.files) {
        for (let i = 0; i < req.files.files.length; i++) {
          const item = new Item({
            content: itemAdd.content,
            title: itemAdd.title,
            legend: itemAdd.legend ? itemAdd.legend : "",
            categorie: itemAdd.categorie,
            description: itemAdd.description
              ? itemAdd.description
              : { blocks: [], time: "", version: "" },
            date: itemAdd.date,
            place: itemAdd.place,
          });
          const file = req.files.files[i];
          result = await uploadFiles(file);
          const photos = [
            {
              src: `/api/files/${result.Key}`,
              type: file.mimetype,
            },
          ];
          Object.assign(item, { photos: photos });
          await item.save();
        }
        return res
          .status(200)
          .send({ message: "Ajouts effectués avec succés." });
      }
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Impossible d'importer les fichiers." });
    }
  }
);

router.get("/?:contentType", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : null;
  const per_page = req.query.per_page ? Number(req.query.per_page) : null;
  const filterContent =
    req.params.contentType !== "null"
      ? { content: req.params.contentType }
      : {};
  const filterID = req.query.itemId ? { _id: req.query.itemId } : {};
  const filterCategorie = req.query.filters
    ? { categorie: { $all: req.query.filters } }
    : {};
  try {
    const count = await Item.countDocuments({
      ...filterContent,
      ...filterCategorie,
    });
    const items = await Item.find({
      ...filterContent,
      ...filterID,
      ...filterCategorie,
    })
      .limit(per_page)
      .skip(offset);

    return res.status(200).send({ items: items, count: count });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de récupérer les données." });
  }
});

/* Recup all filters */
router.get("/filters/:contentType", async (req, res) => {
  let filters = [];
  const filterCategorie = req.query.filters
    ? { categorie: { $all: req.query.filters } }
    : {};
  try {
    const items = await Item.find({
      content: req.params.contentType,
      ...filterCategorie,
    });

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

router.put("/file-delete", isAuth, async (req, res) => {
  let itemId = req.body.itemId;
  let filesToDelete = req.body.filesToDelete;

  try {
    const item = await Item.findById(itemId);
    let photos = item.photos;
    let newPhotos = [];

    for (let i = 0; i < filesToDelete.length; i++) {
      const file = filesToDelete[i];
      const fileKey = file.src.split("/")[3];
      const deleteResult = await deleteFiles(fileKey);
    }
    newPhotos = photos.filter((el) => {
      return !filesToDelete.find((element) => {
        return element.src === el.src;
      });
    });
    item.photos = newPhotos;
    await item.save();
    return res.status(200).send({ message: `Modifications enregistrées.` });
  } catch (error) {
    return res
      .status(400)
      .send({ message: `Impossible de supprimer le fichier.` });
  }
});

router.put(
  "/",
  isAuth,
  upload.fields([{ name: "file" }, { name: "files" }]),
  async (req, res) => {
    let result;
    let photos = [];
    const itemAdd = JSON.parse(req.body.item);

    try {
      const item = await Item.findById(itemAdd._id);
      /* Importation des fichiers */
      if (req.files.file) {
        try {
          const oldFileKey = item.photos[0].src.split("/")[3];
          const deleteResult = await deleteFiles(oldFileKey);
          result = await uploadFiles(req.files.file[0]);

          photos.push({
            src: `/api/files/${result.Key}`,
            type: req.files.file[0].mimetype,
          });
          Object.assign(itemAdd, { photos: photos });
          item.photos = photos;
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
          Object.assign(itemAdd, { photos: photos });
          item.photos = item.photos.concat(photos);
        } catch (error) {
          return res
            .status(400)
            .send({ message: "Impossible d'importer les fichiers." });
        }
      }
      item.content = itemAdd.content;
      item.title = itemAdd.title;
      item.categorie = itemAdd.categorie;
      item.description = itemAdd.description
        ? itemAdd.description
        : item.description;
      item.legend = itemAdd.legend ? itemAdd.legend : item.legend;
      item.date = itemAdd.date;
      item.place = itemAdd.place;
      await item.save();
      return res
        .status(200)
        .send({ message: "Les modifications ont été enregistrées." });
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Impossible de sauvegarder les modifications." });
    }
  }
);

router.delete("/:itemId", isAuth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    /* Suppression des fichiers */
    if (item.type === "single") {
      const oldFileKey = item.photos[0].src.split("/")[3];
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
