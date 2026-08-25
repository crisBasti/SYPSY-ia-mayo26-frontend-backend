import RewardRule from "../models/RewardRule.js";


// =====================================================
// OBTENER REGLAS
// =====================================================

export const obtenerReglas = async (req, res) => {

    try {

        const reglas = await RewardRule.find()
            .sort({
                prioridad: -1,
                createdAt: 1
            });

        res.json(reglas);

    }

    catch (error) {

        console.error(
            "Error obteniendo reglas RSPY:",
            error
        );

        res.status(500).json({

            message:
                "No se pudieron obtener las reglas de recompensas."

        });

    }

};


// =====================================================
// OBTENER UNA REGLA
// =====================================================

export const obtenerRegla = async (req, res) => {

    try {

        const regla =
            await RewardRule.findById(req.params.id);


        if (!regla) {

            return res.status(404).json({

                message:
                    "Regla de recompensa no encontrada."

            });

        }


        res.json(regla);

    }

    catch (error) {

        console.error(
            "Error obteniendo regla RSPY:",
            error
        );

        res.status(500).json({

            message:
                "No se pudo obtener la regla."

        });

    }

};


// =====================================================
// CREAR REGLA
// =====================================================

export const crearRegla = async (req, res) => {

    try {

        const {

            nombre,
            descripcion,
            evento,
            activa,
            tipoRecompensa,
            cantidadRSPY,
            porcentaje,
            montoMinimo,
            montoMaximo,
            limitePorOperacion,
            limiteDiario,
            limiteMensual,
            maximoPorUsuario,
            requierePedidoFinalizado,
            requierePagoVerificado,
            fechaInicio,
            fechaFin,
            prioridad

        } = req.body;


        // =============================================
        // VALIDACIONES BÁSICAS
        // =============================================

        if (!nombre?.trim()) {

            return res.status(400).json({

                message:
                    "El nombre de la regla es obligatorio."

            });

        }


        if (!evento) {

            return res.status(400).json({

                message:
                    "Debes indicar el evento que genera RSPY."

            });

        }


        // =============================================
        // VALIDAR TIPO DE RECOMPENSA
        // =============================================

        if (
            tipoRecompensa &&
            ![
                "fija",
                "porcentaje"
            ].includes(tipoRecompensa)
        ) {

            return res.status(400).json({

                message:
                    "Tipo de recompensa inválido."

            });

        }


        const tipo =
            tipoRecompensa || "fija";


        // =============================================
        // VALIDAR CANTIDAD / PORCENTAJE
        // =============================================

        if (tipo === "fija") {

            if (
                cantidadRSPY === undefined ||
                Number(cantidadRSPY) <= 0
            ) {

                return res.status(400).json({

                    message:
                        "Una recompensa fija debe tener una cantidad de RSPY mayor a cero."

                });

            }

        }


        if (tipo === "porcentaje") {

            if (
                porcentaje === undefined ||
                Number(porcentaje) <= 0
            ) {

                return res.status(400).json({

                    message:
                        "Una recompensa porcentual debe tener un porcentaje mayor a cero."

                });

            }

        }


        // =============================================
        // VALIDAR RANGOS
        // =============================================

        if (
            montoMinimo !== undefined &&
            Number(montoMinimo) < 0
        ) {

            return res.status(400).json({

                message:
                    "El monto mínimo no puede ser negativo."

            });

        }


        if (
            montoMaximo !== undefined &&
            montoMaximo !== null &&
            Number(montoMaximo) < 0
        ) {

            return res.status(400).json({

                message:
                    "El monto máximo no puede ser negativo."

            });

        }


        if (
            montoMaximo !== undefined &&
            montoMaximo !== null &&
            montoMinimo !== undefined &&
            Number(montoMaximo) < Number(montoMinimo)
        ) {

            return res.status(400).json({

                message:
                    "El monto máximo no puede ser menor que el monto mínimo."

            });

        }


        // =============================================
        // EVITAR NOMBRE DUPLICADO
        // =============================================

        const reglaExistente =
            await RewardRule.findOne({

                nombre:
                    nombre.trim()

            });


        if (reglaExistente) {

            return res.status(409).json({

                message:
                    "Ya existe una regla con ese nombre."

            });

        }


        // =============================================
        // CREAR REGLA
        // =============================================

        const regla =
            await RewardRule.create({

                nombre:
                    nombre.trim(),

                descripcion:
                    descripcion?.trim() || "",

                evento,

                activa:
                    activa !== undefined
                        ? Boolean(activa)
                        : true,

                tipoRecompensa:
                    tipo,

                cantidadRSPY:
                    tipo === "fija"
                        ? Number(cantidadRSPY)
                        : 0,

                porcentaje:
                    tipo === "porcentaje"
                        ? Number(porcentaje)
                        : 0,

                montoMinimo:
                    montoMinimo !== undefined
                        ? Number(montoMinimo)
                        : 0,

                montoMaximo:
                    montoMaximo !== undefined &&
                    montoMaximo !== null
                        ? Number(montoMaximo)
                        : null,

                limitePorOperacion:
                    limitePorOperacion !== undefined &&
                    limitePorOperacion !== null
                        ? Number(limitePorOperacion)
                        : null,

                limiteDiario:
                    limiteDiario !== undefined &&
                    limiteDiario !== null
                        ? Number(limiteDiario)
                        : null,

                limiteMensual:
                    limiteMensual !== undefined &&
                    limiteMensual !== null
                        ? Number(limiteMensual)
                        : null,

                maximoPorUsuario:
                    maximoPorUsuario !== undefined &&
                    maximoPorUsuario !== null
                        ? Number(maximoPorUsuario)
                        : null,

                requierePedidoFinalizado:
                    Boolean(
                        requierePedidoFinalizado
                    ),

                requierePagoVerificado:
                    Boolean(
                        requierePagoVerificado
                    ),

                fechaInicio:
                    fechaInicio || null,

                fechaFin:
                    fechaFin || null,

                prioridad:
                    prioridad !== undefined
                        ? Number(prioridad)
                        : 0,

                creadoPor: {

                    uid:
                        req.user.uid || "",

                    email:
                        req.user.email || "",

                    nombre:
                        req.user.name ||
                        req.user.nombre ||
                        ""

                }

            });


        res.status(201).json(regla);

    }

    catch (error) {

        console.error(
            "Error creando regla RSPY:",
            error
        );

        res.status(500).json({

            message:
                error.message ||
                "No se pudo crear la regla."

        });

    }

};


// =====================================================
// ACTUALIZAR REGLA
// =====================================================

export const actualizarRegla = async (req, res) => {

    try {

        const regla =
            await RewardRule.findById(req.params.id);


        if (!regla) {

            return res.status(404).json({

                message:
                    "Regla de recompensa no encontrada."

            });

        }


        const {

            nombre,
            descripcion,
            evento,
            activa,
            tipoRecompensa,
            cantidadRSPY,
            porcentaje,
            montoMinimo,
            montoMaximo,
            limitePorOperacion,
            limiteDiario,
            limiteMensual,
            maximoPorUsuario,
            requierePedidoFinalizado,
            requierePagoVerificado,
            fechaInicio,
            fechaFin,
            prioridad

        } = req.body;


        // =============================================
        // VALIDACIONES
        // =============================================

        if (
            nombre !== undefined &&
            !nombre.trim()
        ) {

            return res.status(400).json({

                message:
                    "El nombre no puede estar vacío."

            });

        }


        if (
            evento !== undefined &&
            ![
                "compra",
                "venta",
                "publicidad",
                "promocion",
                "registro",
                "referido",
                "especial"
            ].includes(evento)
        ) {

            return res.status(400).json({

                message:
                    "Evento de recompensa inválido."

            });

        }


        if (
            tipoRecompensa !== undefined &&
            ![
                "fija",
                "porcentaje"
            ].includes(tipoRecompensa)
        ) {

            return res.status(400).json({

                message:
                    "Tipo de recompensa inválido."

            });

        }


        if (
            cantidadRSPY !== undefined &&
            Number(cantidadRSPY) < 0
        ) {

            return res.status(400).json({

                message:
                    "La cantidad de RSPY no puede ser negativa."

            });

        }


        if (
            porcentaje !== undefined &&
            Number(porcentaje) < 0
        ) {

            return res.status(400).json({

                message:
                    "El porcentaje no puede ser negativo."

            });

        }


        if (
            montoMinimo !== undefined &&
            Number(montoMinimo) < 0
        ) {

            return res.status(400).json({

                message:
                    "El monto mínimo no puede ser negativo."

            });

        }


        if (
            montoMaximo !== undefined &&
            montoMaximo !== null &&
            Number(montoMaximo) < 0
        ) {

            return res.status(400).json({

                message:
                    "El monto máximo no puede ser negativo."

            });

        }


        // =============================================
        // NOMBRE DUPLICADO
        // =============================================

        if (nombre !== undefined) {

            const duplicada =
                await RewardRule.findOne({

                    nombre:
                        nombre.trim(),

                    _id: {
                        $ne: regla._id
                    }

                });


            if (duplicada) {

                return res.status(409).json({

                    message:
                        "Ya existe otra regla con ese nombre."

                });

            }

        }


        // =============================================
        // ACTUALIZAR
        // =============================================

        if (nombre !== undefined)
            regla.nombre = nombre.trim();


        if (descripcion !== undefined)
            regla.descripcion = descripcion.trim();


        if (evento !== undefined)
            regla.evento = evento;


        if (activa !== undefined)
            regla.activa = Boolean(activa);


        if (tipoRecompensa !== undefined)
            regla.tipoRecompensa = tipoRecompensa;


        if (cantidadRSPY !== undefined)
            regla.cantidadRSPY = Number(cantidadRSPY);


        if (porcentaje !== undefined)
            regla.porcentaje = Number(porcentaje);


        if (montoMinimo !== undefined)
            regla.montoMinimo = Number(montoMinimo);


        if (montoMaximo !== undefined)
            regla.montoMaximo =
                montoMaximo === null
                    ? null
                    : Number(montoMaximo);


        if (limitePorOperacion !== undefined)
            regla.limitePorOperacion =
                limitePorOperacion === null
                    ? null
                    : Number(limitePorOperacion);


        if (limiteDiario !== undefined)
            regla.limiteDiario =
                limiteDiario === null
                    ? null
                    : Number(limiteDiario);


        if (limiteMensual !== undefined)
            regla.limiteMensual =
                limiteMensual === null
                    ? null
                    : Number(limiteMensual);


        if (maximoPorUsuario !== undefined)
            regla.maximoPorUsuario =
                maximoPorUsuario === null
                    ? null
                    : Number(maximoPorUsuario);


        if (
            requierePedidoFinalizado !== undefined
        )
            regla.requierePedidoFinalizado =
                Boolean(
                    requierePedidoFinalizado
                );


        if (
            requierePagoVerificado !== undefined
        )
            regla.requierePagoVerificado =
                Boolean(
                    requierePagoVerificado
                );


        if (fechaInicio !== undefined)
            regla.fechaInicio =
                fechaInicio || null;


        if (fechaFin !== undefined)
            regla.fechaFin =
                fechaFin || null;


        if (prioridad !== undefined)
            regla.prioridad =
                Number(prioridad);


        // =============================================
        // REGISTRAR QUIÉN MODIFICÓ LA REGLA
        // =============================================

        regla.actualizadoPor = {

            uid:
                req.user.uid || "",

            email:
                req.user.email || "",

            nombre:
                req.user.name ||
                req.user.nombre ||
                ""

        };


        await regla.save();


        res.json(regla);

    }

    catch (error) {

        console.error(
            "Error actualizando regla RSPY:",
            error
        );

        res.status(500).json({

            message:
                error.message ||
                "No se pudo actualizar la regla."

        });

    }

};


// =====================================================
// ACTIVAR / DESACTIVAR
// =====================================================

export const cambiarEstadoRegla = async (req, res) => {

    try {

        const regla =
            await RewardRule.findById(req.params.id);


        if (!regla) {

            return res.status(404).json({

                message:
                    "Regla de recompensa no encontrada."

            });

        }


        regla.activa =
            !regla.activa;


        regla.actualizadoPor = {

            uid:
                req.user.uid || "",

            email:
                req.user.email || "",

            nombre:
                req.user.name ||
                req.user.nombre ||
                ""

        };


        await regla.save();


        res.json({

            message:
                regla.activa
                    ? "Regla activada correctamente."
                    : "Regla desactivada correctamente.",

            regla

        });

    }

    catch (error) {

        console.error(
            "Error cambiando estado de regla:",
            error
        );

        res.status(500).json({

            message:
                "No se pudo cambiar el estado de la regla."

        });

    }

};


// =====================================================
// ELIMINAR REGLA
// =====================================================

export const eliminarRegla = async (req, res) => {

    try {

        const regla =
            await RewardRule.findById(req.params.id);


        if (!regla) {

            return res.status(404).json({

                message:
                    "Regla de recompensa no encontrada."

            });

        }


        await regla.deleteOne();


        res.json({

            message:
                "Regla eliminada correctamente."

        });

    }

    catch (error) {

        console.error(
            "Error eliminando regla RSPY:",
            error
        );

        res.status(500).json({

            message:
                "No se pudo eliminar la regla."

        });

    }

};