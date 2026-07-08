import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(

{
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    sellerUid: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["view", "whatsapp"],
        required: true
    }

},

{
    timestamps: true
}

);

export default mongoose.model(
    "Analytics",
    analyticsSchema
);