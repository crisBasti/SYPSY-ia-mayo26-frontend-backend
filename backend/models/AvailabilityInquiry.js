import mongoose from "mongoose";

const availabilityInquirySchema = new mongoose.Schema(
  {
    compradorUid: {
      type: String,
      required: true,
      index: true
    },

    vendedorUid: {
      type: String,
      required: true,
      index: true
    },

    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },

    estado: {
      type: String,
      enum: [
        "pendiente",
        "disponible",
        "no_disponible"
      ],
      default: "pendiente",
      index: true
    },

    respuesta: {
      type: String,
      default: null,
      trim: true
    },

    respondedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

availabilityInquirySchema.index({
  compradorUid: 1,
  productoId: 1,
  estado: 1
});

availabilityInquirySchema.index({
  vendedorUid: 1,
  estado: 1,
  createdAt: -1
});

export default mongoose.model(
  "AvailabilityInquiry",
  availabilityInquirySchema
);