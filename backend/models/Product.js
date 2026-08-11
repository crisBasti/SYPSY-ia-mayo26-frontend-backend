import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    condicion: { type: String, enum: ["nuevo", "usado"], default: "nuevo"},
    categoria: { type: String, required: true },
    images: { type: [String], default: [] },
    vendedor: { uid: { type: String, required: true },
      email: { type: String },
      name: { type: String },
      telefono: { type: String }
    },

    ubicacion: {
      provincia: {
        type: String,
        default: ""
    },

    ciudad: {
        type: String,
        default: ""
    },

    barrio: {
        type: String,
        default: ""
    },

    lat: Number,
    lng: Number

},

logistica: {

    modalidades: {
        type: [String],
        enum: ["envio", "retiro"],
        default: []
    },

    envio: {

        disponible: {
            type: Boolean,
            default: false
        },

        gratis: {
            type: Boolean,
            default: false
        },

        costoFijo: {
            type: Number,
            default: 0
        },

        costoCalculado: {
            type: Boolean,
            default: false
        }

    },

    retiro: {

        disponible: {
            type: Boolean,
            default: false
        }

    },

    tiempoEntrega: {

        tipo: {
            type: String,
            enum: [
                "hoy",
                "manana",
                "dias",
                "personalizado"
            ],
            default: "dias"
        },

        minimo: {
            type: Number,
            default: 1
        },

        maximo: {
            type: Number,
            default: 3
        }

    }

},

  // NUEVO
  views: {
    type: Number,
    default: 0
  },

  ordersGenerated: {
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
},

estado: {
    type: String,
    enum: ["activo", "pausado"],
    default: "activo"
},

fechaPausado: {
    type: Date,
    default: null
},

    // =========================
    // MONETIZACIÓN SYPSY
    // =========================

    promocionado:{
        type:Boolean,
        default:false
    },

    estadoPromocion:{

    type:String,

    enum:[
        "ninguna",
        "pendiente",
        "activa",
        "vencida"
    ],

    default:"ninguna"

},

    nivelPromocion:{
        type:Number,
        default:0
    },

    fechaPromocionInicio:{
        type:Date,
        default:null
    },

    fechaPromocionFin:{
        type:Date,
        default:null
    },

    rankingScore:{

    type:Number,

    default:0

}

},
{ timestamps: true }
);

export default mongoose.model("Product", productSchema);