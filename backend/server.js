import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import infoRouter from "./routes/infoRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/info", infoRouter);
app.use("/api/item", itemRouter);
app.use("/api/images", imageRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Serveur démarre sur le port ${process.env.PORT || 3001}`);
});
