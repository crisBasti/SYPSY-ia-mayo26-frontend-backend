import mongoose from "mongoose";

const spyWalletSchema = new mongoose.Schema(
    {

        uid: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        saldo: {
            type: Number,
            default: 0,
            min: 0
        },

        totalGanado: {
            type: Number,
            default: 0,
            min: 0
        },

        totalGastado: {
            type: Number,
            default: 0,
            min: 0
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "SpyWallet",
    spyWalletSchema
);