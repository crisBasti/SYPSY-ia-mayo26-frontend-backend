import mongoose from "mongoose";

const rewardRuleSchema = new mongoose.Schema(
    {

        // ==========================================
        // IDENTIFICACIÓN DE LA REGLA
        // ==========================================

        nombre: {
            type: String,
            required: true,
            trim: true
        },

        descripcion: {
            type: String,
            default: ""
        },


        // ==========================================
        // TIPO DE OPERACIÓN QUE GENERA RSPY
        // ==========================================

        evento: {
            type: String,
            enum: [
                "compra",
                "venta",
                "publicidad",
                "promocion",
                "registro",
                "referido",
                "especial"
            ],
            required: true,
            index: true
        },


        // ==========================================
        // ESTADO DE LA REGLA
        // ==========================================

        activa: {
            type: Boolean,
            default: true,
            index: true
        },


        // ==========================================
        // CÁLCULO DE LA RECOMPENSA
        // ==========================================

        tipoRecompensa: {
            type: String,
            enum: [
                "fija",
                "porcentaje"
            ],
            default: "fija"
        },

        cantidadRSPY: {
            type: Number,
            default: 0,
            min: 0
        },

        porcentaje: {
            type: Number,
            default: 0,
            min: 0
        },


        // ==========================================
        // CONDICIONES ECONÓMICAS
        // ==========================================

        montoMinimo: {
            type: Number,
            default: 0,
            min: 0
        },

        montoMaximo: {
            type: Number,
            default: null,
            min: 0
        },


        // ==========================================
        // LÍMITES DE EMISIÓN
        // ==========================================

        limitePorOperacion: {
            type: Number,
            default: null,
            min: 0
        },

        limiteDiario: {
            type: Number,
            default: null,
            min: 0
        },

        limiteMensual: {
            type: Number,
            default: null,
            min: 0
        },


        // ==========================================
        // CONTROL DE REPETICIÓN
        // ==========================================

        maximoPorUsuario: {
            type: Number,
            default: null,
            min: 0
        },


        // ==========================================
        // REQUISITOS DE LA OPERACIÓN
        // ==========================================

        requierePedidoFinalizado: {
            type: Boolean,
            default: false
        },

        requierePagoVerificado: {
            type: Boolean,
            default: false
        },


        // ==========================================
        // VIGENCIA
        // ==========================================

        fechaInicio: {
            type: Date,
            default: null
        },

        fechaFin: {
            type: Date,
            default: null
        },


        // ==========================================
        // PRIORIDAD
        // ==========================================

        prioridad: {
            type: Number,
            default: 0
        },


        // ==========================================
        // CONTROL ADMINISTRATIVO
        // ==========================================

        creadoPor: {
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

        actualizadoPor: {
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
        }

    },
    {
        timestamps: true
    }
);


// ==========================================
// ÍNDICES
// ==========================================

rewardRuleSchema.index({
    evento: 1,
    activa: 1
});

rewardRuleSchema.index({
    fechaInicio: 1,
    fechaFin: 1
});


export default mongoose.model(
    "RewardRule",
    rewardRuleSchema
);