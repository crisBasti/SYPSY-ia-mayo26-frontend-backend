import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
    {
        // ==========================================
        // USUARIO
        // ==========================================

        uid: {
            type: String,
            required: true,
            unique: true,
            index: true
        },


        // ==========================================
        // ESTADO DE LA CUENTA RSPY
        // ==========================================

        estado: {
            type: String,
            enum: [
                "activo",
                "bloqueado",
                "suspendido"
            ],
            default: "activo",
            index: true
        },


        // ==========================================
        // SALDO ACTUAL
        // ==========================================

        saldo: {
            type: Number,
            default: 0,
            min: 0
        },


        // ==========================================
        // TOTALES HISTÓRICOS
        // ==========================================

        totalGanado: {
            type: Number,
            default: 0,
            min: 0
        },

        totalGastado: {
            type: Number,
            default: 0,
            min: 0
        },


        // ==========================================
        // ÚLTIMA OPERACIÓN
        // ==========================================

        fechaUltimaOperacion: {
            type: Date,
            default: null
        },


        // ==========================================
        // MOVIMIENTOS LEGACY / RESUMEN
        // ==========================================
        // Se conserva por compatibilidad con la
        // estructura anterior.
        //
        // El libro contable principal será
        // RewardTransaction.
        // ==========================================

        movimientos: [
            {
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

                concepto: {
                    type: String,
                    required: true
                },

                referencia: {
                    type: String,
                    default: ""
                },

                fecha: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    {
        timestamps: true
    }
);


export default mongoose.model(
    "Reward",
    rewardSchema
);