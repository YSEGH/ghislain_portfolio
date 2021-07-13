import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isAuth } from "../middleware.js";

dotenv.config();

const router = express.Router();

router.get("/:userid", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({ message: "Utilisateur introuvable." });
  }
});

router.put("/", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      return res.status(400).send({ message: "Utilisateur introuvable." });
    }

    const validPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Mot de passe invalide." });
    }

    user.username = req.body.username;

    if (req.body.newPassword) {
      //Hash the password
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(req.body.newPassword, salt);
      user.password = hashedPassword;
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.TOKEN_SECRET || "JIZEOAOE8932JJIKZEA23"
    );

    await user.save();
    return res
      .status(200)
      .send({ message: "Modifications enregistrées.", token: token });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible d'effectuer les modifications." });
  }
});

router.put("/reset-password", isAuth, async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(400).send({ message: "Utilisateur introuvable." });
    }

    //Hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    user.password = hashedPassword;

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.TOKEN_SECRET || "JIZEOAOE8932JJIKZEA23"
    );

    await user.save();
    return res.status(200).send({
      message: "Réinitialisation effectuée. Mot de passe : 1234",
      token: token,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible d'effectuer la réinitialisation." });
  }
});

router.post("/register", async (req, res) => {
  //checking if user already in db
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) {
    return res
      .status(400)
      .send({ message: "Ce nom d'utilisateur est déjà enregistré." });
  }
  //Hash the password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    await user.save();
    res
      .status(200)
      .send({ message: "L'utilisateur a été enregistré avec succés." });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res
      .status(400)
      .send({ message: "Email ou mot de passe incorrect." });
  }
  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!validPassword) {
    return res.status(400).send({ message: "Mot de passe invalide." });
  }
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.TOKEN_SECRET || "JIZEOAOE8932JJIKZEA23"
  );
  res.status(200).send({
    user: {
      _id: user._id,
      username: user.username,
    },
    token: token,
    message: "Vous êtes connecté !",
  });
});

export default router;
