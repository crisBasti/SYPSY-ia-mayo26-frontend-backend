const transitions = {

    pendiente: {

        ACEPTAR: "aceptado",

        CANCELAR: "cancelado"

    },

    aceptado: {

        PREPARAR: "preparando",

        CANCELAR: "cancelado"

    },

    preparando: {

        ENTREGAR_REPARTIDOR: "entregado"

    },

    entregado: {},

    finalizado: {},

    cancelado: {}

};

export function executeAction(estadoActual, accion){

    const siguienteEstado=

        transitions[estadoActual]?.[accion];

    if(!siguienteEstado){

        throw new Error(

            `No se puede ejecutar ${accion}`

        );

    }

    return siguienteEstado;

}