import RewardRule from "../models/RewardRule.js";
import RewardTransaction from "../models/RewardTransaction.js";
import { ganarRSPY } from "./rewardService.js";


// =====================================================
// OBTENER REGLAS APLICABLES
// =====================================================

const obtenerReglasAplicables = async ({
    evento,
    monto = 0,
    fecha = new Date()
}) => {

    const reglas = await RewardRule.find({

        evento,

        activa: true,

        $or: [
            {
                fechaInicio: null
            },
            {
                fechaInicio: {
                    $lte: fecha
                }
            }
        ],

        $and: [
            {
                $or: [
                    {
                        fechaFin: null
                    },
                    {
                        fechaFin: {
                            $gte: fecha
                        }
                    }
                ]
            },

            {
                montoMinimo: {
                    $lte: monto
                }
            },

            {
                $or: [
                    {
                        montoMaximo: null
                    },
                    {
                        montoMaximo: {
                            $gte: monto
                        }
                    }
                ]
            }
        ]

    }).sort({

        prioridad: -1,

        createdAt: 1

    });


    return reglas;

};


// =====================================================
// CALCULAR RECOMPENSA
// =====================================================

const calcularRSPY = ({
    regla,
    monto
}) => {

    let cantidad = 0;


    if (
        regla.tipoRecompensa === "fija"
    ) {

        cantidad =
            Number(
                regla.cantidadRSPY
            );

    }


    if (
        regla.tipoRecompensa === "porcentaje"
    ) {

        cantidad =
            monto *
            (
                Number(
                    regla.porcentaje
                ) / 100
            );

    }


    // ==============================================
    // LÍMITE POR OPERACIÓN
    // ==============================================

    if (
        regla.limitePorOperacion !== null &&
        regla.limitePorOperacion !== undefined
    ) {

        cantidad =
            Math.min(
                cantidad,
                Number(
                    regla.limitePorOperacion
                )
            );

    }


    return Math.max(
        0,
        Math.floor(cantidad)
    );

};


// =====================================================
// APLICAR REGLA
// =====================================================

export const aplicarReglaRSPY = async ({

    uid,

    evento,

    monto = 0,

    referencia = "",

    referenciaUnica = "",

    concepto,

    origen = "sistema",

    usuarioOperacion = {},

    metadata = {},

    pedidoFinalizado = false,

    pagoVerificado = false

}) => {

    if (!uid) {

        throw new Error(
            "UID de usuario requerido."
        );

    }


    if (!evento) {

        throw new Error(
            "Evento RSPY requerido."
        );

    }


    const reglas =
        await obtenerReglasAplicables({

            evento,

            monto,

            fecha: new Date()

        });


    if (!reglas.length) {

        return {

            aplicada: false,

            cantidad: 0,

            motivo:
                "No existe una regla RSPY aplicable."

        };

    }


    for (
        const regla
        of reglas
    ) {


        // ==========================================
        // PEDIDO FINALIZADO
        // ==========================================

        if (
            regla.requierePedidoFinalizado &&
            !pedidoFinalizado
        ) {

            continue;

        }


        // ==========================================
        // PAGO VERIFICADO
        // ==========================================

        if (
            regla.requierePagoVerificado &&
            !pagoVerificado
        ) {

            continue;

        }


        // ==========================================
        // CALCULAR RSPY
        // ==========================================

        const cantidad =
            calcularRSPY({

                regla,

                monto

            });


        if (
            cantidad <= 0
        ) {

            continue;

        }


        // ==========================================
        // EVITAR DUPLICAR OPERACIÓN
        // ==========================================

        const referenciaFinal =
            referenciaUnica ||
            (
                referencia
                    ? `${regla._id}-${referencia}`
                    : ""
            );


        if (
            referenciaFinal
        ) {

            const existente =
                await RewardTransaction.findOne({

                    referenciaUnica:
                        referenciaFinal

                });


            if (existente) {

                return {

                    aplicada: false,

                    duplicada: true,

                    cantidad: 0,

                    regla

                };

            }

        }


        // ==========================================
        // ENTREGAR RSPY
        // ==========================================

        const reward =
            await ganarRSPY({

                uid,

                cantidad,

                concepto:
                    concepto ||
                    regla.nombre,

                origen,

                referencia,

                referenciaUnica:
                    referenciaFinal,

                usuarioOperacion,

                metadata

            });


        return {

            aplicada: true,

            duplicada: false,

            cantidad,

            regla,

            reward

        };

    }


    return {

        aplicada: false,

        cantidad: 0,

        motivo:
            "Las reglas encontradas no cumplen sus condiciones."

    };

};