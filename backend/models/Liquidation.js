import mongoose from "mongoose";

const liquidationSchema = new mongoose.Schema({

    pedido:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },

    vendedorUid:{
        type:String,
        required:true
    },

    vendedorNombre:{
        type:String,
        default:""
    },


    montoVenta:{
        type:Number,
        default:0
    },


    comisionSYPSY:{
        type:Number,
        default:0
    },


    montoLiquidar:{
        type:Number,
        default:0
    },


    datosBancarios:{

        titular:String,

        banco:String,

        alias:String,

        cbu:String,

        cvu:String

    },


    estado:{
        type:String,
        enum:[
            "pendiente",
            "pagada",
            "rechazada"
        ],
        default:"pendiente"
    },


    comprobanteTransferencia:{
        type:String,
        default:""
    },


    fechaPago:{
        type:Date,
        default:null
    }


},{
    timestamps:true
});


export default mongoose.model(
    "Liquidation",
    liquidationSchema
);