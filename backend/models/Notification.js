import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {

        // ==========================================
        // DESTINATARIO
        // ==========================================

        recipientUid: {
            type: String,
            required: true,
            index: true
        },


        // ==========================================
        // TIPO DE NOTIFICACIÓN
        // ==========================================

        tipo: {
            type: String,
            enum: [

                "pedido_nuevo",
                "pedido_actualizado",
                "pedido_cancelado",

                "pago_pendiente",
                "pago_aprobado",
                "pago_rechazado",

                "promocion_aprobada",
                "promocion_rechazada",
                "promocion_finalizada",

                "producto_vendido",
                "producto_aprobado",
                "producto_rechazado",

                "nuevo_like",
                "nueva_resena",

                "usuario_registrado",

                "sistema"

            ],
            required: true,
            index: true
        },


        // ==========================================
        // CONTENIDO
        // ==========================================

        titulo: {
            type: String,
            required: true,
            trim: true
        },

        mensaje: {
            type: String,
            required: true,
            trim: true
        },


        // ==========================================
        // ESTADO
        // ==========================================

        leida: {
            type: Boolean,
            default: false,
            index: true
        },


        // ==========================================
        // REFERENCIA
        // ==========================================

        referencia: {
            type: String,
            default: null
        },

        referenciaTipo: {
            type: String,
            default: null
        },


        // ==========================================
        // ACCIÓN
        // ==========================================

        accion: {
            type: String,
            default: null
        },


        // ==========================================
        // INFORMACIÓN EXTRA
        // ==========================================

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },


        // ==========================================
        // EXPIRACIÓN FUTURA
        // ==========================================

        expiresAt: {
            type: Date,
            default: null,
            index: true
        }

    },
    {
        timestamps: true
    }
);


// ==========================================
// ÍNDICE PARA NOTIFICACIONES DEL USUARIO
// ==========================================

notificationSchema.index({
    recipientUid: 1,
    leida: 1,
    createdAt: -1
});


export default mongoose.model(
    "Notification",
    notificationSchema
);