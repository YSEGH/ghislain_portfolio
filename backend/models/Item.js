import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  legend: { type: String, required: true },
  categorie: { type: Array, required: true },
  photos: { type: Array, required: true },
  description: { type: String },
  date: { type: Date },
  place: { type: String },
});

const itemModel = mongoose.model("item", itemSchema);
export default itemModel;
