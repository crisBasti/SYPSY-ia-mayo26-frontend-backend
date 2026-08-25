import mongoose from "mongoose";

const rewardTransactionSchema = new mongoose.Schema(
    {

        uid: {
            type: String,
            required: true,
            index: true
        },

        tipo: {
            type: String,
            enum: [
                "ganado",
                "gastado",
                "ajuste"
            ],
            required: true
        },

        cantidad: {
            type: Number,
            required: true
        },

        saldoAnterior: {
            type: Number,
            required: true
        },

        saldoPosterior: {
            type: Number,
            required: true
        },

        concepto: {
            type: String,
            required: true
        },

        origen: {
    type: String,
    enum: [
        "compra",
        "venta",
        "publicidad",
        "promocion",
        "registro",
        "referido",
        "especial",
        "bonificacion",
        "ajuste_admin",
        "correccion",
        "reembolso",
        "sistema"
    ],
    required: true
},

        referencia: {
            type: String,
            default: ""
        },

        referenciaUnica: {
            type: String,
            default: "",
            unique: true,
            sparse: true
        },

        usuarioOperacion: {
            uid: {
                type: String,
                default: ""
            },

            email: {
                type: String,
                default: ""
            },

            nombre: {
                type: String,
                default: ""
            }
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }

    },
    {
        timestamps: true
    }
);

rewardTransactionSchema.index({
    uid: 1,
    createdAt: -1
});

export default mongoose.model(
    "RewardTransaction",
    rewardTransactionSchema
);