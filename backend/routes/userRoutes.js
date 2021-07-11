import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

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
    process.env.TOKEN_SECRET
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
