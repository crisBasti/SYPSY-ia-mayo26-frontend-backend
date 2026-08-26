import Reward from "../models/Reward.js";
import RewardTransaction from "../models/RewardTransaction.js";


// ==========================================
// OBTENER MIS RECOMPENSAS
// ==========================================

export const obtenerMisRecompensas = async (req, res) => {

    try {

        let reward = await Reward.findOne({
            uid: req.user.uid
        });


        // Crear cuenta RSPY automáticamente
        // si el usuario todavía no tiene una.

        if (!reward) {

            reward = await Reward.create({

                uid: req.user.uid,

                saldo: 0,

                totalGanado: 0,

                totalGastado: 0,

                movimientos: []

            });

        }


        res.json(reward);

    }

    catch (error) {

        console.error(
            "Error obteniendo recompensas:",
            error
        );


        res.status(500).json({

            message:
                "No se pudieron obtener las recompensas."

        });

    }

};


// ==========================================
// ADMIN - HISTORIAL DE TRANSACCIONES RSPY
// ==========================================

export const obtenerTransaccionesUsuario = async (req, res) => {

    try {

        const { uid } = req.params;

        const transacciones =
            await RewardTransaction
                .find({ uid })
                .sort({
                    createdAt: -1
                });

        res.json(transacciones);

    }

    catch (error) {

        console.error(
            "Error obteniendo transacciones RSPY:",
            error
        );

        res.status(500).json({

            message:
                "No se pudieron obtener las transacciones RSPY."

        });

    }

};