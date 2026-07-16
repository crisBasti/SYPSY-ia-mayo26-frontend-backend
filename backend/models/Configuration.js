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
    }

},{
    timestamps:true
});

export default mongoose.model(
    "Configuration",
    configurationSchema
);