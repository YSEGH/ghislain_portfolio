import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import infoRouter from "./routes/infoRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import path from "path";
import fs from "fs";
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

app.use("/static-files", express.static(path.join(__dirname, "/static-files")));

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use(
  "/js",
  (req, res, next) => {
    req.url = req.url + ".gz";
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Disposition", "gzip");
    next();
  },
  express.static(path.join(__dirname, "/frontend/dist/js"))
);
app.use(
  "/css",
  (req, res, next) => {
    req.url = req.url + ".gz";
    res.setHeader("Content-Type", "text/css");
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Disposition", "gzip");
    next();
  },
  express.static(path.join(__dirname, "/frontend/dist/css"))
);

app.get("/about", (req, res, next) => {
  const filePath = path.join(__dirname, "/frontend/dist/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Ghislain Ramage - About");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Want to know more about me ? That’s what this page is for."
    );
    res.send(data);
  });
});

app.get("/circus", (req, res, next) => {
  const filePath = path.join(__dirname, "/frontend/dist/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Ghislain Ramage - Circus");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Discover all the experiences of Ghislain Ramage as a Cyr wheel artist through the world."
    );
    res.send(data);
  });
});

app.get("/photography", (req, res, next) => {
  const filePath = path.join(__dirname, "/frontend/dist/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Ghislain Ramage - Photography");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Discover my passion for photography through my photos taken around the world."
    );
    res.send(data);
  });
});

app.get("/blog", (req, res, next) => {
  const filePath = path.join(__dirname, "/frontend/dist/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Ghislain Ramage - Blog");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Want to know more about my news ? This is where it happens."
    );
    res.send(data);
  });
});

app.get("/contact", (req, res, next) => {
  const filePath = path.join(__dirname, "/frontend/dist/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Ghislain Ramage - Contact");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Would you like to contact me ? You can find my contact details on this page."
    );
    res.send(data);
  });
});

app.get("/projects", (req, res, next) => {
  const filePath = path.join(__dirname, "/frontend/dist/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Ghislain Ramage - Projects");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Find on this page all my activities outside the circus. Brands, associations etc..."
    );
    res.send(data);
  });
});

app.get("/agenda", (req, res, next) => {
  const filePath = path.join(__dirname, "/frontend/dist/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Ghislain Ramage - Agenda");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Would you like to know where you can find me ? Here you will find my future performances."
    );
    res.send(data);
  });
});

app.get("/", (req, res, next) => {
  const filePath = path.join(__dirname, "/frontend/dist/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Ghislain Ramage");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Ghislain Ramage. Professional circus artist and photographer as a hobby. This is my website."
    );
    res.send(data);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Serveur démarre sur le port ${process.env.PORT || 3001}`);
});
