import { adminAuth } from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Token requerido"
      });
    }

    const token =
      authHeader.split("Bearer ")[1];

    const decodedToken =
      await adminAuth.verifyIdToken(token);

    req.user = decodedToken;

    next();

  } catch (error) {

    console.error(
      "Firebase Auth Error:",
      error
    );

    return res.status(401).json({
      message: "Token inválido"
    });
  }
};