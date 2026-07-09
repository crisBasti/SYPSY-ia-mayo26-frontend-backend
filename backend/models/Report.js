import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(

{

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
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

    status: {
        type: String,
        default: "pending"
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