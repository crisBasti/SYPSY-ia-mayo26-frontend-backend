import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({

    uid:{
        type:String,
        required:true,
        unique:true
    },

    name:String,

    email:String,

    telefono:String,

    descripcion:{

    type:String,

    default:""

},

whatsapp:{

    type:String,

    default:""

},

instagram:{

    type:String,

    default:""

},

facebook:{

    type:String,

    default:""

},

sitioWeb:{

    type:String,

    default:""

},

logo:{

    type:String,

    default:""

},

verificado:{

    type:Boolean,

    default:false

},

ventasRealizadas:{

    type:Number,

    default:0

},

calificacionPromedio:{

    type:Number,

    default:0

},

cantidadCalificaciones:{

    type:Number,

    default:0

},

reseñasRecibidas:[

{

    pedido:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Order"

    },

    compradorUid:String,

    compradorNombre:String,

    estrellas:Number,

    comentario:String,

    fecha:{

        type:Date,

        default:Date.now

    }

}

],

nivelVendedor:{

    type:String,

    default:"Bronce"

},

porcentajeEntregas:{

    type:Number,

    default:100

},

porcentajeCancelaciones:{

    type:Number,

    default:0

},

trustScore:{

    type:Number,

    default:100

},

    direccion:{

        calle:String,

        numero:String,

        piso:String,

        departamento:String,

        barrio:String,

        ciudad:String,

        provincia:String,

        codigoPostal:String

    },

    ubicacion:{

        lat:Number,

        lng:Number

    },

    favoritos: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
],

    datosBancarios:{

    alias:{
        type:String,
        default:""
    },

    cvu:{
        type:String,
        default:""
    },

     cbu:{
        type:String,
        default:""
    },

    titular:{
        type:String,
        default:""
    },

    banco:{
        type:String,
        default:""
    }

}

},
{timestamps:true});

export default mongoose.model(
"UserProfile",
userProfileSchema
);