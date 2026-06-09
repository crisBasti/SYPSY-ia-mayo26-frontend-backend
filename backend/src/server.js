import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "../config/db.js";

import productRoutes from "../routes/productRoutes.js";

connectDB();


const app = express();

app.use(
  cors({
    origin: [
      "https://sypsy-ia-mayo26-frontend-backend-amgz3v9nd-crisbastis-projects.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor SYPSY funcionando 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});