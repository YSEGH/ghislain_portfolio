import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  content: { type: String, default: "" },
  title: { type: String, default: "" },
  legend: { type: String, default: "" },
  categorie: { type: Array, default: [] },
  photos: { type: Array, default: [] },
  addDescription: { type: Boolean, default: false },
  description: { type: Object, default: { blocks: [], time: "", version: "" } },
  date: { type: String, default: "" },
  place: { type: String, default: "" },
});

const itemModel = mongoose.model("item", itemSchema);
export default itemModel;
