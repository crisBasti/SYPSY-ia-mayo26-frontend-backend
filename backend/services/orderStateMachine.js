const transitions = {
    pendiente: {
        ACEPTAR: "aceptado",
        CANCELAR: "cancelado",
    },

    aceptado: {
        PREPARAR: "preparando",
        CANCELAR: "cancelado",
    },

    preparando: {
        DESPACHAR: "enviado",
        CANCELAR: "cancelado",
    },

    enviado: {
        EN_REPARTO: "en_reparto",
    },

    en_reparto: {
        ENTREGAR: "entregado",
    },

    entregado: {},

    finalizado: {},

    cancelado: {},
};

export function executeAction(estadoActual, accion) {

    const siguienteEstado =
        transitions[estadoActual]?.[accion];

    if (!siguienteEstado) {

        throw new Error(
            `No se puede ejecutar '${accion}' desde '${estadoActual}'`
        );

    }

    return siguienteEstado;
}