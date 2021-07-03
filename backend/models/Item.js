import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  legend: { type: String, required: true },
  categorie: { type: Array, required: true },
  photos: { type: Array },
  description: { type: Object },
  date: { type: Date },
  place: { type: String },
});

const itemModel = mongoose.model("item", itemSchema);
export default itemModel;
