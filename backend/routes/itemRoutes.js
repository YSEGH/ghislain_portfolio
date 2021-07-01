import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const item = new Item({
    type: req.body.type,
    title: req.body.title,
    legend: req.body.legend,
    categorie: req.body.categorie,
    photos: req.body.photos,
    description: req.body.description,
    date: req.body.date,
    place: req.body.place,
  });
  try {
    await item.save();
    return res.status(200).send({ message: "Ajout effectué avec succés." });
  } catch (error) {
    return res.status(400).send({ message: "Ajout impossible." });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find({ type: req.body.type });
    console.log(items);
    return res.status(200).send(items);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de récupérer les données." });
  }
});

router.put("/", async (req, res) => {
  try {
    const item = await Item.findById(req.body.id);
    item.type = req.body.type;
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

router.delete("/", async (req, res) => {
  try {
    const item = await Item.findById(req.body.id);
    await item.remove();
    return res
      .status(200)
      .send({ message: "Suppression effectuée avec succés." });
  } catch (error) {
    return res.status(400).send({ message: "Suppression impossible." });
  }
});

export default router;
