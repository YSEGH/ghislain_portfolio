import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "JIZEOAOE8932JJIKZEA23",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Vous n'êtes pas authentifié." });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "Vous n'êtes pas authentifié." });
  }
};
