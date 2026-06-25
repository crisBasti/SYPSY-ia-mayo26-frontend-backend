import { adminAuth } from "../config/firebaseAdmin.js";

const authFirebase = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        mensaje: "Token requerido"
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decodedToken =
      await adminAuth.verifyIdToken(token);

    req.user = decodedToken;

    next();

  } catch (error) {

    return res.status(401).json({
      mensaje: "Token inválido"
    });

  }
};

export default authFirebase;