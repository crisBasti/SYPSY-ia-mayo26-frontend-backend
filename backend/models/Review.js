import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    pedido:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Order",

        required:true

    },

    vendedorUid:{

        type:String,

        required:true

    },

    compradorUid:{

        type:String,

        required:true

    },

    puntuacion:{

        type:Number,

        min:1,

        max:5,

        required:true

    },

    comentario:{

        type:String,

        maxlength:500,

        default:""

    }

},
{timestamps:true});

export default mongoose.model(
    "Review",
    reviewSchema
);