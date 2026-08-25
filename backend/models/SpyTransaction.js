import mongoose from "mongoose";

const spyTransactionSchema = new mongoose.Schema(
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
                "gastado"
            ],
            required: true
        },

        cantidad: {
            type: Number,
            required: true,
            min: 1
        },

        concepto: {
            type: String,
            required: true,
            trim: true
        },

        origen: {
            type: String,
            enum: [
                "compra",
                "venta",
                "publicidad",
                "promocion",
                "bonificacion",
                "ajuste"
            ],
            required: true
        },

        referencia: {
            type: String,
            default: ""
        },

        saldoAnterior: {
            type: Number,
            required: true
        },

        saldoPosterior: {
            type: Number,
            required: true
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "SpyTransaction",
    spyTransactionSchema
);