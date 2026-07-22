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
    enum: [
        "pendiente",
        "pendiente_verificacion",
        "retenido",
        "liberar",
        "pagado",
        "rechazado",
        "reembolsado"
    ],
    default: "pendiente"
},

comprobantePago: {
    type: String,
    default: ""
},

fechaPago: Date,

fechaVerificacion: Date,

verificadoPor: {
    uid: String,
    email: String,
    name: String
},

observacionPago: {
    type: String,
    default: ""
},

fechaComprobante: Date,

fechaRetencion: Date,

fechaLiberacion: Date,

fechaTransferencia: Date,

metodoPago: {

    type:String,

    default:"Transferencia"

},

referenciaTransferencia: {

    type:String,

    default:""

},

observacionPago: {

    type:String,

    default:""

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

codigoEntrega:{

    type:String,

    default:""

},

codigoValidado:{

    type:Boolean,

    default:false

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

historialPago:[

    {

        estado:String,

        descripcion:String,

        usuario:String,

        fecha:{

            type:Date,

            default:Date.now

        }

    }

],

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);