import express from "express";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import Info from "../models/Info.js";

const router = express.Router();

dotenv.config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const lastname = req.body.lastname;
  const company = req.body.company;
  const phone = req.body.phone;
  const email = req.body.email;
  const message = req.body.message;
  let destinataire;

  try {
    const info = await Info.findById("60ddfdd8a590213be23d8317");
    destinataire = info.email;
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible d'envoyer votre message." });
  }
  const data = {
    from: `YOU@YOUR_DOMAIN_NAME.COM`,
    to: `${destinataire}`,
    subject: `Quelqu'un s'intéresse à toi !`,
    html: `<p>Nom : ${lastname}</p></br>
    <p>Entreprise : ${company}</p></br>
    <p>Téléphone : ${phone}</p></br>
    <p>Email : ${email}</p></br>
    <p>Message : ${message}</p>`,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Impossible d'envoyer ce message." });
    }
    return res
      .status(200)
      .send({ message: "Message sent ! Thank you for your interest." });
  });
});

export default router;
