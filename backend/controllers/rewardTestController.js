import {
    aplicarReglaRSPY
} from "../services/rewardRuleService.js";


// =====================================================
// PROBAR REGLA RSPY
// =====================================================

export const probarReglaRSPY = async (req, res) => {

    try {

        const {

            evento,
            monto,
            referencia,
            concepto,
            pedidoFinalizado,
            pagoVerificado

        } = req.body;


        if (!evento) {

            return res.status(400).json({

                message:
                    "El evento RSPY es obligatorio."

            });

        }


        const resultado =
            await aplicarReglaRSPY({

                uid:
                    req.user.uid,

                evento,

                monto:
                    Number(monto) || 0,

                referencia:
                    referencia || "",

                concepto:
                    concepto ||
                    "Prueba de recompensa RSPY",

                origen:
                    "sistema",

                pedidoFinalizado:
                    Boolean(
                        pedidoFinalizado
                    ),

                pagoVerificado:
                    Boolean(
                        pagoVerificado
                    ),

                metadata: {

                    prueba:
                        true,

                    ejecutadoPor:
                        req.user.email || ""

                }

            });


        res.json({

            message:
                resultado.aplicada
                    ? "Regla RSPY aplicada correctamente."
                    : "No se aplicó ninguna regla RSPY.",

            resultado

        });

    }

    catch (error) {

        console.error(
            "Error probando regla RSPY:",
            error
        );


        res.status(500).json({

            message:
                error.message ||
                "No se pudo probar la regla RSPY."

        });

    }

};