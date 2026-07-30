import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "../config/db.js";
import productRoutes from "../routes/productRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import Product from "../models/Product.js";
import reportRoutes from "../routes/reportRoutes.js";
import advertisementRoutes from "../routes/advertisementRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import configurationRoutes from "../routes/configurationRoutes.js";
import financeRoutes from "../routes/financeRoutes.js";
import userProfileRoutes from "../routes/userProfileRoutes.js";
import reviewRoutes from "../routes/reviewRoutes.js";


connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "https://sypsy-ia-mayo26-frontend-backend.vercel.app",
      "http://localhost:5173",
      "https://www.sypsy.com.ar",
      "https://sypsy.com.ar",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports",reportRoutes);
app.use("/api/advertisements",advertisementRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/configuration", configurationRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor SYPSY funcionando 🚀",
  });
});

app.get("/sitemap.xml", async (req, res) => {
  try {

    const products = await Product.find()
      .select("_id categoria updatedAt");

    const urls = [];

    urls.push(`
  <url>
    <loc>https://www.sypsy.com.ar/</loc>
    <priority>1.0</priority>
  </url>
`);

    const categorias = [
  ...new Set(
    products
      .map(p => p.categoria)
      .filter(Boolean)
  )
];

    categorias.forEach(cat => {
      urls.push(`
        <url>
          <loc>
            https://www.sypsy.com.ar/categoria/${encodeURIComponent(cat)}
          </loc>
        </url>
      `);
    });

    products.forEach(product => {

      urls.push(`
  <url>
    <loc>https://www.sypsy.com.ar/producto/${product._id}</loc>
    <lastmod>${new Date(product.updatedAt).toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
`);

    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.join("")}

</urlset>`;

    res.header(
      "Content-Type",
      "application/xml"
    );

    res.send(sitemap);

  } catch (error) {

    console.error(error);

    res.status(500).send(
      "Error generando sitemap"
    );
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});