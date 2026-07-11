import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },

    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    apellido: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    telefono: {
      type: String,
      required: true,
      trim: true,
    },

    blocked: {
      type: Boolean,
      default: false,
    },

    blockedReason: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },

    role: {
      type: String,

    enum: [

      "user",

      "seller",

      "moderator",

      "admin"

        ],

      default: "user"

    },

    verifiedSeller: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "User",
  userSchema
);