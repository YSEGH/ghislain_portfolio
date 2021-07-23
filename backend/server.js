import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import infoRouter from "./routes/infoRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import path from "path";
import compression from "compression";

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

const app = express();

app.use(compression(9));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/email", emailRouter);
app.use("/api/info", infoRouter);
app.use("/api/item", itemRouter);
app.use("/api/files", imageRouter);

const __dirname = path.resolve();

/*const setDataFilesHeaders = (res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Content-Disposition", "gzip");
};
 app.get("*.js", function (req, res, next) {
  req.url = req.url + ".gz";
  res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Content-Type", "text/javascript");
  next();
}); */
app.use("/static-files", express.static(path.join(__dirname, "/static-files")));
app.use(
  express.static(
    path.join(__dirname, "/frontend/dist") /* , {
    setHeaders: (res, path, stat) => {
      res.type("Content-Type", "application/json");
      res.type("Content-Encoding", "gzip");
      res.type("Content-Disposition", "gzip");
    },
  } */
  )
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"))
);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Serveur démarre sur le port ${process.env.PORT || 3001}`);
});
