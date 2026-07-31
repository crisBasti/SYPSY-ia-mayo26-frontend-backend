import mongoose from "mongoose";

const promotionCampaignSchema = new mongoose.Schema(
{
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    vendedor: {
        uid: {
            type: String,
            required: true
        },
        email: String,
        name: String
    },

    tipo: {
        type: String,
        enum: [
            "destacado",
            "banner_home",
            "banner_categoria",
            "banner_producto",
            "premium",
            "push"
        ],
        default: "destacado"
    },

    plan: {
        nombre: String,
        dias: Number,
        precio: Number
    },

    estado: {
        type: String,
        enum: [
            "pendiente_pago",
            "pagada",
            "activa",
            "finalizada",
            "cancelada"
        ],
        default: "pendiente_pago"
    },

    pago: {
        metodo: String,
        referencia: String,
        aprobado: {
            type: Boolean,
            default: false
        },
        fecha: Date
    },

    fechaInicio: Date,

    fechaFin: Date,

    estadisticas: {

        impresiones: {
            type: Number,
            default: 0
        },

        clicks: {
            type: Number,
            default: 0
        },

        contactosWhatsapp: {
            type: Number,
            default: 0
        },

        compras: {
            type: Number,
            default: 0
        }

    }

},
{
    timestamps: true
});

export default mongoose.model(
    "PromotionCampaign",
    promotionCampaignSchema
);