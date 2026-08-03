import mongoose from "mongoose";


const promotionSchema = new mongoose.Schema(

{

    productId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Product",

        required:true

    },


    sellerUid:{

        type:String,

        required:true

    },


    plan:{

        nombre:{

            type:String,

            enum:[
                "DESTACADO_24H",
                "DESTACADO_7D",
                "PREMIUM_30D"
            ],

            required:true

        },


        precio:{

            type:Number,

            required:true

        },


        duracionHoras:{

            type:Number,

            required:true

        }

    },


    estado:{

        type:String,

        enum:[

            "pendiente_pago",

            "pendiente_verificacion",

            "activo",

            "finalizado",

            "cancelado"

        ],

        default:"pendiente_pago"

    },


    fechaInicio:{

        type:Date,

        default:null

    },


    fechaFin:{

        type:Date,

        default:null

    },


    impresiones:{

        type:Number,

        default:0

    },


    clicks:{

        type:Number,

        default:0

    },

    orders:{

    type:Number,

    default:0

},

contacts:{

    type:Number,

    default:0

},

spent:{

    type:Number,

    default:0

},

paymentId:{

    type:String,

    default:null

},

paymentStatus:{

    type:String,

    default:"pending"

},

paymentMethod:{

    type:String,

    default:null

},

comprobantePago: {
    type: String,
    default: null
},

fechaPago: {
    type: Date,
    default: null
},

fechaVerificacion: {
    type: Date,
    default: null
}


},

{

timestamps:true

}

);


export default mongoose.model(
    "Promotion",
    promotionSchema
);