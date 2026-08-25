import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema({

    comisionGeneral:{
        type:Number,
        default:5
    },

    comisionPremium:{
        type:Number,
        default:3
    },

    comisionServicios:{
        type:Number,
        default:8
    },

    mercadoPago: {

    alias:{
        type:String,
        default:""
    },

    cvu:{
        type:String,
        default:""
    },

    titular:{
        type:String,
        default:""
    },

    qr:{
        type:String,
        default:""
    }

},

// ==========================================
// CONFIGURACIÓN DE RECOMPENSAS RSPY
// ==========================================

recompensasRSPY: {

    activa: {
        type: Boolean,
        default: false
    },

    compraFinalizada: {
        type: Number,
        default: 0,
        min: 0
    },

    ventaFinalizada: {
        type: Number,
        default: 0,
        min: 0
    },

    maximoPorOperacion: {
        type: Number,
        default: 0,
        min: 0
    },

    maximoDiario: {
        type: Number,
        default: 0,
        min: 0
    },

    maximoMensual: {
        type: Number,
        default: 0,
        min: 0
    }

}

},{
    timestamps:true
});

export default mongoose.model(
    "Configuration",
    configurationSchema
);