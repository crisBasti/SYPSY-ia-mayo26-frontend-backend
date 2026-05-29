import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categoria: { type: String, required: true },

    images: { type: [String], default: [] },

    // 🔥 NUEVO: vendedor real
    vendedor: {
  uid: { type: String, required: true },
  email: { type: String },
  name: { type: String }
}
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);