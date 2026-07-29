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

    }

},
{timestamps:true});

export default mongoose.model(
"UserProfile",
userProfileSchema
);