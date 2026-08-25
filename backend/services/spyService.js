import SpyWallet from "../models/SpyWallet.js";
import SpyTransaction from "../models/SpyTransaction.js";


export const obtenerOCrearWallet = async (uid) => {

    let wallet = await SpyWallet.findOne({
        uid
    });

    if (!wallet) {

        wallet = await SpyWallet.create({
            uid,
            saldo: 0,
            totalGanado: 0,
            totalGastado: 0
        });

    }

    return wallet;

};


export const acreditarRSPY = async ({
    uid,
    cantidad,
    concepto,
    origen,
    referencia = ""
}) => {

    if (!cantidad || cantidad <= 0) {

        throw new Error(
            "La cantidad de RSPY debe ser mayor a cero."
        );

    }

    const wallet =
        await obtenerOCrearWallet(uid);

    const saldoAnterior =
        wallet.saldo;

    wallet.saldo += cantidad;

    wallet.totalGanado += cantidad;

    await wallet.save();

    await SpyTransaction.create({

        uid,

        tipo: "ganado",

        cantidad,

        concepto,

        origen,

        referencia,

        saldoAnterior,

        saldoPosterior:
            wallet.saldo

    });

    return wallet;

};


export const debitarRSPY = async ({
    uid,
    cantidad,
    concepto,
    origen,
    referencia = ""
}) => {

    if (!cantidad || cantidad <= 0) {

        throw new Error(
            "La cantidad de RSPY debe ser mayor a cero."
        );

    }

    const wallet =
        await obtenerOCrearWallet(uid);

    if (wallet.saldo < cantidad) {

        throw new Error(
            "Saldo RSPY insuficiente."
        );

    }

    const saldoAnterior =
        wallet.saldo;

    wallet.saldo -= cantidad;

    wallet.totalGastado += cantidad;

    await wallet.save();

    await SpyTransaction.create({

        uid,

        tipo: "gastado",

        cantidad,

        concepto,

        origen,

        referencia,

        saldoAnterior,

        saldoPosterior:
            wallet.saldo

    });

    return wallet;

};