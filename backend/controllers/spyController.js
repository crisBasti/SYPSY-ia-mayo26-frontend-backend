import SpyWallet from "../models/SpyWallet.js";
import SpyTransaction from "../models/SpyTransaction.js";
import {
    obtenerOCrearWallet
} from "../services/spyService.js";


export const obtenerMiWallet = async (req, res) => {

    try {

        const uid = req.user.uid;

        const wallet =
            await obtenerOCrearWallet(uid);

        res.json(wallet);

    }

    catch (error) {

        console.error(
            "Error obteniendo wallet RSPY:",
            error
        );

        res.status(500).json({

            message:
                "No se pudo obtener la billetera RSPY."

        });

    }

};


export const obtenerMisMovimientos = async (
    req,
    res
) => {

    try {

        const uid = req.user.uid;

        const movimientos =
            await SpyTransaction.find({
                uid
            })
            .sort({
                createdAt: -1
            })
            .limit(100);

        res.json(movimientos);

    }

    catch (error) {

        console.error(
            "Error obteniendo movimientos RSPY:",
            error
        );

        res.status(500).json({

            message:
                "No se pudieron obtener los movimientos RSPY."

        });

    }

};