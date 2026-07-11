import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categoria: { type: String, required: true },

  images: { type: [String], default: [] },

  vendedor: {
    uid: { type: String, required: true },
    email: { type: String },
    name: { type: String },
    telefono: { type: String }
  },

  // NUEVO
  views: {
    type: Number,
    default: 0
  },

  whatsappClicks: {
    type: Number,
    default: 0
  },

  hidden: {
    type: Boolean,
    default: false
},

reportsCount: {
    type: Number,
    default: 0
}

},
{ timestamps: true }
);

export default mongoose.model("Product", productSchema);