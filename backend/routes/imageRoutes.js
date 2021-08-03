import express from "express";
import { deleteFiles, getFileStream, uploadFiles } from "../s3.js";

const router = express.Router();

/* Get files */
router.get("/:key", async (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res).on("error", () => console.log("Fichier introuvable."));
});

export default router;
