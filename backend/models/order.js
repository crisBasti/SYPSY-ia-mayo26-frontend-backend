import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    numeroPedido: {
    type: String,
    unique: true
  },

    comprador: {

    uid:{
        type:String,
        required:true
    },

    email:String,

    name:String,

    telefono:String

  },

    vendedor: {
  uid: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  name: {
    type: String,
  },

  telefono: {
    type: String,
  }
},

    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    precio: {
      type: Number,
      required: true,
    },

    cantidad: {
      type: Number,
      default: 1,
    },

    estado: {
      type: String,
      enum: [
             "pendiente",
             "aceptado",
             "preparando",
             "enviado",
             "en_reparto",
             "entregado",
             "finalizado",
             "cancelado",
            ],
      default: "pendiente",
    },

    estadoPago: {
      type: String,
      enum: ["pendiente", "pagado", "reembolsado"],
      default: "pendiente",
    },

    comision: {
      type: Number,
      default: 0,
    },

    costoEnvio: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    trackingNumber: {
    type: String,
    default: ""
},

transportista: {
    type: String,
    default: ""
},

fechaAceptado: Date,

fechaPreparacion: Date,

fechaEnvio: Date,

fechaEnReparto: Date,

fechaEntregado: Date,

fechaFinalizado: Date,

historial: [
    {
        estado: String,
        fecha: {
            type: Date,
            default: Date.now
        },
        descripcion: String
    }
],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);