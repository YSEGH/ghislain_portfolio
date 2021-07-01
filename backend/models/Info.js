import mongoose from "mongoose";

const infoSchema = mongoose.Schema({
  lastname: { type: String },
  firstname: { type: String },
  email: { type: String },
  phone: { type: String },
  city: { type: String },
  country: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  aboutDescription: { type: Object },
  aboutPhoto: { type: Object },
});

const infoModel = mongoose.model("info", infoSchema);
export default infoModel;
