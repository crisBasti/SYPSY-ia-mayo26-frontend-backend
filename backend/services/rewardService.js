import mongoose from "mongoose";
import Reward from "../models/Reward.js";
import RewardTransaction from "../models/RewardTransaction.js";


// =====================================================
// OBTENER O CREAR CUENTA RSPY
// =====================================================

export const obtenerCuentaRSPY = async (uid) => {

    if (!uid) {
        throw new Error(
            "UID de usuario requerido."
        );
    }

    let reward = await Reward.findOne({
        uid
    });

    if (!reward) {

        reward = await Reward.create({

            uid,

            saldo: 0,

            totalGanado: 0,

            totalGastado: 0,

            estado: "activo",

            fechaUltimaOperacion: null

        });

    }

    return reward;
};


// =====================================================
// GANAR RSPY
// =====================================================

export const ganarRSPY = async ({

    uid,

    cantidad,

    concepto,

    origen = "sistema",

    referencia = "",

    referenciaUnica = "",

    usuarioOperacion = {},

    metadata = {}

}) => {

    if (!uid) {

        throw new Error(
            "UID de usuario requerido."
        );

    }

    if (!cantidad || cantidad <= 0) {

        throw new Error(
            "La cantidad de RSPY debe ser mayor a cero."
        );

    }

    if (!concepto) {

        throw new Error(
            "El concepto de la recompensa es obligatorio."
        );

    }


    // =================================================
    // EVITAR DUPLICACIÓN
    // =================================================

    if (referenciaUnica) {

        const existente =
            await RewardTransaction.findOne({
                referenciaUnica
            });

        if (existente) {

            return await obtenerCuentaRSPY(uid);

        }

    }


    const session =
        await mongoose.startSession();


    try {

        session.startTransaction();


        // =============================================
        // OBTENER / CREAR CUENTA
        // =============================================

        let reward =
            await Reward.findOne({
                uid
            }).session(session);


        if (!reward) {

            const creadas =
                await Reward.create(
                    [
                        {
                            uid,
                            saldo: 0,
                            totalGanado: 0,
                            totalGastado: 0,
                            estado: "activo",
                            fechaUltimaOperacion: null
                        }
                    ],
                    { session }
                );

            reward =
                creadas[0];

        }


        // =============================================
        // VERIFICAR ESTADO
        // =============================================

        if (
            reward.estado !== "activo"
        ) {

            throw new Error(
                "La cuenta RSPY se encuentra bloqueada."
            );

        }


        // =============================================
        // SALDOS
        // =============================================

        const saldoAnterior =
            reward.saldo;

        const saldoPosterior =
            saldoAnterior + cantidad;


        // =============================================
        // ACTUALIZAR CUENTA
        // =============================================

        reward.saldo =
            saldoPosterior;

        reward.totalGanado +=
            cantidad;

        reward.fechaUltimaOperacion =
            new Date();


        await reward.save({
            session
        });


        // =============================================
        // REGISTRAR MOVIMIENTO
        // =============================================

        await RewardTransaction.create(
            [
                {

                    uid,

                    tipo: "ganado",

                    cantidad,

                    saldoAnterior,

                    saldoPosterior,

                    concepto,

                    origen,

                    referencia,

                    referenciaUnica,

                    usuarioOperacion,

                    metadata

                }
            ],
            { session }
        );


        await session.commitTransaction();


        return reward;

    }

    catch (error) {

        await session.abortTransaction();

        throw error;

    }

    finally {

        await session.endSession();

    }

};


// =====================================================
// GASTAR RSPY
// =====================================================

export const gastarRSPY = async ({

    uid,

    cantidad,

    concepto,

    origen = "sistema",

    referencia = "",

    referenciaUnica = "",

    usuarioOperacion = {},

    metadata = {}

}) => {

    if (!uid) {

        throw new Error(
            "UID de usuario requerido."
        );

    }

    if (!cantidad || cantidad <= 0) {

        throw new Error(
            "La cantidad de RSPY debe ser mayor a cero."
        );

    }

    if (!concepto) {

        throw new Error(
            "El concepto del gasto es obligatorio."
        );

    }


    // =================================================
    // EVITAR DUPLICACIÓN
    // =================================================

    if (referenciaUnica) {

        const existente =
            await RewardTransaction.findOne({
                referenciaUnica
            });

        if (existente) {

            return await obtenerCuentaRSPY(uid);

        }

    }


    const session =
        await mongoose.startSession();


    try {

        session.startTransaction();


        // =============================================
        // OBTENER CUENTA
        // =============================================

        const reward =
            await Reward.findOne({
                uid
            }).session(session);


        if (!reward) {

            throw new Error(
                "La cuenta RSPY no existe."
            );

        }


        // =============================================
        // ESTADO
        // =============================================

        if (
            reward.estado !== "activo"
        ) {

            throw new Error(
                "La cuenta RSPY se encuentra bloqueada."
            );

        }


        // =============================================
        // SALDO
        // =============================================

        if (
            reward.saldo < cantidad
        ) {

            throw new Error(
                "Saldo RSPY insuficiente."
            );

        }


        const saldoAnterior =
            reward.saldo;

        const saldoPosterior =
            saldoAnterior - cantidad;


        // =============================================
        // ACTUALIZAR CUENTA
        // =============================================

        reward.saldo =
            saldoPosterior;

        reward.totalGastado +=
            cantidad;

        reward.fechaUltimaOperacion =
            new Date();


        await reward.save({
            session
        });


        // =============================================
        // REGISTRAR MOVIMIENTO
        // =============================================

        await RewardTransaction.create(
            [
                {

                    uid,

                    tipo: "gastado",

                    cantidad,

                    saldoAnterior,

                    saldoPosterior,

                    concepto,

                    origen,

                    referencia,

                    referenciaUnica,

                    usuarioOperacion,

                    metadata

                }
            ],
            { session }
        );


        await session.commitTransaction();


        return reward;

    }

    catch (error) {

        await session.abortTransaction();

        throw error;

    }

    finally {

        await session.endSession();

    }

};


// =====================================================
// AJUSTE ADMINISTRATIVO
// =====================================================

export const ajustarRSPY = async ({

    uid,

    cantidad,

    concepto,

    referencia = "",

    usuarioOperacion = {},

    metadata = {}

}) => {

    if (!uid) {

        throw new Error(
            "UID de usuario requerido."
        );

    }

    if (!cantidad || cantidad === 0) {

        throw new Error(
            "La cantidad del ajuste no puede ser cero."
        );

    }

    if (!concepto) {

        throw new Error(
            "El concepto del ajuste es obligatorio."
        );

    }


    const session =
        await mongoose.startSession();


    try {

        session.startTransaction();


        // =============================================
        // OBTENER CUENTA
        // =============================================

        const reward =
            await Reward.findOne({
                uid
            }).session(session);


        if (!reward) {

            throw new Error(
                "La cuenta RSPY no existe."
            );

        }


        // =============================================
        // ESTADO
        // =============================================

        if (
            reward.estado !== "activo"
        ) {

            throw new Error(
                "La cuenta RSPY se encuentra bloqueada."
            );

        }


        const saldoAnterior =
            reward.saldo;


        let saldoPosterior;


        // =============================================
        // ACREDITACIÓN
        // =============================================

        if (
            cantidad > 0
        ) {

            saldoPosterior =
                saldoAnterior + cantidad;

            reward.saldo =
                saldoPosterior;

            reward.totalGanado +=
                cantidad;

        }


        // =============================================
        // RETIRO
        // =============================================

        else {

            const descuento =
                Math.abs(cantidad);


            if (
                reward.saldo <
                descuento
            ) {

                throw new Error(
                    "Saldo RSPY insuficiente para realizar el ajuste."
                );

            }


            saldoPosterior =
                saldoAnterior - descuento;

            reward.saldo =
                saldoPosterior;

            reward.totalGastado +=
                descuento;

        }


        reward.fechaUltimaOperacion =
            new Date();


        // =============================================
        // GUARDAR CUENTA
        // =============================================

        await reward.save({
            session
        });


        // =============================================
        // REGISTRAR MOVIMIENTO
        // =============================================

        await RewardTransaction.create(
            [
                {

                    uid,

                    tipo: "ajuste",

                    cantidad,

                    saldoAnterior,

                    saldoPosterior,

                    concepto,

                    origen: "ajuste_admin",

                    referencia,

                    usuarioOperacion,

                    metadata

                }
            ],
            { session }
        );


        await session.commitTransaction();


        return reward;

    }

    catch (error) {

        await session.abortTransaction();

        throw error;

    }

    finally {

        await session.endSession();

    }

};