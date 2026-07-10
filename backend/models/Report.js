import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(

{

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    productImage: {
        type: String,
        default: ""
    },

    sellerUid: {
        type: String,
        required: true
    },

    sellerName: {
        type: String,
        default: ""
    },

    sellerEmail: {
        type: String,
        default: ""
    },

    reason: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    reporterIp: {
        type: String,
        default: ""
    },

    status:{

type:String,

enum:[

"pending",

"resolved",

"rejected"

],

default:"pending"

}

},

{
    timestamps: true
}

);

export default mongoose.model(
    "Report",
    reportSchema
);