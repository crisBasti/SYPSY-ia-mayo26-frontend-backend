import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
    getRewardRules,
    createRewardRule
} from "../../services/rewardService";

function AdminRewards() {

    const [reglas, setReglas] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

        const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

const [guardando, setGuardando] =
    useState(false);

const [formulario, setFormulario] = useState({

    nombre: "",

    descripcion: "",

    evento: "compra",

    activa: true,

    tipoRecompensa: "fija",

    cantidadRSPY: 100,

    porcentaje: 0,

    montoMinimo: 0,

    montoMaximo: null,

    limitePorOperacion: null,

    limiteDiario: null,

    limiteMensual: null,

    maximoPorUsuario: null,

    requierePedidoFinalizado: false,

    requierePagoVerificado: false,

    fechaInicio: "",

    fechaFin: "",

    prioridad: 0

});


    // ==========================================
    // CARGAR REGLAS
    // ==========================================

    const cargarReglas = async () => {

        try {

            setLoading(true);
            setError("");

            const user =
                auth.currentUser;

            if (!user) {

                setError(
                    "No hay un usuario autenticado."
                );

                return;

            }

            const token =
                await user.getIdToken();

            const data =
                await getRewardRules(token);

            setReglas(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch (error) {

            console.error(
                "Error cargando reglas RSPY:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "No se pudieron cargar las reglas RSPY."
            );

        }

        finally {

            setLoading(false);

        }

    };


        // ==========================================
    // CAMBIAR CAMPOS DEL FORMULARIO
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setFormulario((prev) => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

    };


        // ==========================================
    // CREAR REGLA RSPY
    // ==========================================

    const handleCrearRegla = async (e) => {

        e.preventDefault();

        setGuardando(true);
        setError("");


        try {

            const user = auth.currentUser;


            if (!user) {

                throw new Error(
                    "No hay un usuario autenticado."
                );

            }


            const token =
                await user.getIdToken();


            const datos = {

                ...formulario,

                cantidadRSPY:
                    Number(formulario.cantidadRSPY),

                porcentaje:
                    Number(formulario.porcentaje),

                montoMinimo:
                    Number(formulario.montoMinimo),

                montoMaximo:
                    formulario.montoMaximo === "" ||
                    formulario.montoMaximo === null
                        ? null
                        : Number(formulario.montoMaximo),

                limitePorOperacion:
                    formulario.limitePorOperacion === "" ||
                    formulario.limitePorOperacion === null
                        ? null
                        : Number(formulario.limitePorOperacion),

                limiteDiario:
                    formulario.limiteDiario === "" ||
                    formulario.limiteDiario === null
                        ? null
                        : Number(formulario.limiteDiario),

                limiteMensual:
                    formulario.limiteMensual === "" ||
                    formulario.limiteMensual === null
                        ? null
                        : Number(formulario.limiteMensual),

                maximoPorUsuario:
                    formulario.maximoPorUsuario === "" ||
                    formulario.maximoPorUsuario === null
                        ? null
                        : Number(formulario.maximoPorUsuario),

                prioridad:
                    Number(formulario.prioridad)

            };


            await createRewardRule(
                datos,
                token
            );


            // ======================================
            // ACTUALIZAR LISTADO
            // ======================================

            await cargarReglas();


            // ======================================
            // LIMPIAR FORMULARIO
            // ======================================

            setFormulario({

                nombre: "",

                descripcion: "",

                evento: "compra",

                activa: true,

                tipoRecompensa: "fija",

                cantidadRSPY: 100,

                porcentaje: 0,

                montoMinimo: 0,

                montoMaximo: null,

                limitePorOperacion: null,

                limiteDiario: null,

                limiteMensual: null,

                maximoPorUsuario: null,

                requierePedidoFinalizado: false,

                requierePagoVerificado: false,

                fechaInicio: "",

                fechaFin: "",

                prioridad: 0

            });


            setMostrarFormulario(false);


        } catch (error) {

            console.error(
                "Error creando regla RSPY:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "No se pudo crear la regla."
            );

        } finally {

            setGuardando(false);

        }

    };


    useEffect(() => {

        cargarReglas();

    }, []);


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <section className="admin-rewards">

            <div className="admin-rewards-header">

                <div>

                    <h1>
                        🪙 Recompensas RSPY
                    </h1>

                    <p>
                        Administración de reglas y recompensas
                        del ecosistema SYPSY.
                    </p>

                    <div className="reward-admin-actions">

                       <button
                            type="button"
                            onClick={() =>
                                setMostrarFormulario(!mostrarFormulario)
                            }
                        >
                            {mostrarFormulario
                                ? "✖ Cancelar"
                                : "➕ Nueva regla"}
                        </button>

                    </div>

                    {mostrarFormulario && (

    <form
        className="reward-rule-form"
        onSubmit={handleCrearRegla}
    >

        <h2>
            Nueva regla RSPY
        </h2>


        {/* NOMBRE */}

        <div className="reward-form-group">

            <label>
                Nombre de la regla
            </label>

            <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                placeholder="Ej: Recompensa por compra"
                required
            />

        </div>


        {/* DESCRIPCIÓN */}

        <div className="reward-form-group">

            <label>
                Descripción
            </label>

            <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={handleChange}
                placeholder="Explicá cuándo se entrega esta recompensa"
            />

        </div>


        {/* EVENTO */}

        <div className="reward-form-group">

            <label>
                Evento
            </label>

            <select
                name="evento"
                value={formulario.evento}
                onChange={handleChange}
            >

                <option value="compra">
                    Compra
                </option>

                <option value="venta">
                    Venta
                </option>

                <option value="publicidad">
                    Publicidad
                </option>

                <option value="promocion">
                    Promoción
                </option>

                <option value="registro">
                    Registro
                </option>

                <option value="referido">
                    Referido
                </option>

                <option value="especial">
                    Especial
                </option>

            </select>

        </div>


        {/* TIPO DE RECOMPENSA */}

        <div className="reward-form-group">

            <label>
                Tipo de recompensa
            </label>

            <select
                name="tipoRecompensa"
                value={formulario.tipoRecompensa}
                onChange={handleChange}
            >

                <option value="fija">
                    Cantidad fija de RSPY
                </option>

                <option value="porcentaje">
                    Porcentaje
                </option>

            </select>

        </div>


        {/* CANTIDAD FIJA */}

        {formulario.tipoRecompensa === "fija" && (

            <div className="reward-form-group">

                <label>
                    Cantidad de RSPY
                </label>

                <input
                    type="number"
                    name="cantidadRSPY"
                    min="1"
                    value={formulario.cantidadRSPY}
                    onChange={handleChange}
                />

            </div>

        )}


        {/* PORCENTAJE */}

        {formulario.tipoRecompensa === "porcentaje" && (

            <div className="reward-form-group">

                <label>
                    Porcentaje
                </label>

                <input
                    type="number"
                    name="porcentaje"
                    min="0"
                    step="0.01"
                    value={formulario.porcentaje}
                    onChange={handleChange}
                />

            </div>

        )}


        {/* MONTO MÍNIMO */}

        <div className="reward-form-group">

            <label>
                Monto mínimo de operación
            </label>

            <input
                type="number"
                name="montoMinimo"
                min="0"
                value={formulario.montoMinimo}
                onChange={handleChange}
            />

        </div>

        {/* MONTO MÁXIMO */}

<div className="reward-form-group">

    <label>
        Monto máximo de operación
    </label>

    <input
        type="number"
        name="montoMaximo"
        min="0"
        value={formulario.montoMaximo ?? ""}
        onChange={handleChange}
        placeholder="Sin límite"
    />

</div>


{/* LÍMITE POR OPERACIÓN */}

<div className="reward-form-group">

    <label>
        Límite RSPY por operación
    </label>

    <input
        type="number"
        name="limitePorOperacion"
        min="0"
        value={formulario.limitePorOperacion ?? ""}
        onChange={handleChange}
        placeholder="Sin límite"
    />

</div>


{/* LÍMITE DIARIO */}

<div className="reward-form-group">

    <label>
        Límite RSPY diario
    </label>

    <input
        type="number"
        name="limiteDiario"
        min="0"
        value={formulario.limiteDiario ?? ""}
        onChange={handleChange}
        placeholder="Sin límite"
    />

</div>


{/* LÍMITE MENSUAL */}

<div className="reward-form-group">

    <label>
        Límite RSPY mensual
    </label>

    <input
        type="number"
        name="limiteMensual"
        min="0"
        value={formulario.limiteMensual ?? ""}
        onChange={handleChange}
        placeholder="Sin límite"
    />

</div>


{/* MÁXIMO POR USUARIO */}

<div className="reward-form-group">

    <label>
        Máximo RSPY por usuario
    </label>

    <input
        type="number"
        name="maximoPorUsuario"
        min="0"
        value={formulario.maximoPorUsuario ?? ""}
        onChange={handleChange}
        placeholder="Sin límite"
    />

</div>


{/* FECHA DE INICIO */}

<div className="reward-form-group">

    <label>
        Fecha de inicio
    </label>

    <input
        type="datetime-local"
        name="fechaInicio"
        value={formulario.fechaInicio}
        onChange={handleChange}
    />

</div>


{/* FECHA DE FIN */}

<div className="reward-form-group">

    <label>
        Fecha de finalización
    </label>

    <input
        type="datetime-local"
        name="fechaFin"
        value={formulario.fechaFin}
        onChange={handleChange}
    />

</div>


        {/* REGLA ACTIVA */}

        <div className="reward-form-checkbox">

            <label>

                <input
                    type="checkbox"
                    name="activa"
                    checked={formulario.activa}
                    onChange={handleChange}
                />

                Regla activa

            </label>

        </div>


        {/* PEDIDO FINALIZADO */}

        <div className="reward-form-checkbox">

            <label>

                <input
                    type="checkbox"
                    name="requierePedidoFinalizado"
                    checked={
                        formulario.requierePedidoFinalizado
                    }
                    onChange={handleChange}
                />

                Requiere pedido finalizado

            </label>

        </div>


        {/* PAGO VERIFICADO */}

        <div className="reward-form-checkbox">

            <label>

                <input
                    type="checkbox"
                    name="requierePagoVerificado"
                    checked={
                        formulario.requierePagoVerificado
                    }
                    onChange={handleChange}
                />

                Requiere pago verificado

            </label>

        </div>


        {/* PRIORIDAD */}

        <div className="reward-form-group">

            <label>
                Prioridad
            </label>

            <input
                type="number"
                name="prioridad"
                value={formulario.prioridad}
                onChange={handleChange}
            />

        </div>


        {/* GUARDAR */}

        <div className="reward-form-actions">

            <button
                type="submit"
                disabled={guardando}
            >

                {guardando
                    ? "Guardando..."
                    : "💾 Crear regla"}

            </button>


            <button
                type="button"
                onClick={() =>
                    setMostrarFormulario(false)
                }
                disabled={guardando}
            >
                Cancelar
            </button>

        </div>

    </form>

)}

                </div>

            </div>


            {/* ==================================
                CARGANDO
            ================================== */}

            {loading && (

                <div className="admin-rewards-state">

                    <p>
                        Cargando reglas RSPY...
                    </p>

                </div>

            )}


            {/* ==================================
                ERROR
            ================================== */}

            {!loading && error && (

                <div className="admin-rewards-error">

                    <p>
                        ⚠️ {error}
                    </p>

                    <button
                        onClick={cargarReglas}
                    >
                        Reintentar
                    </button>

                </div>

            )}


            {/* ==================================
                SIN REGLAS
            ================================== */}

            {!loading &&
            !error &&
            reglas.length === 0 && (

                <div className="admin-rewards-empty">

                    <div>

                        <span>
                            🪙
                        </span>

                        <h2>
                            No hay reglas RSPY
                        </h2>

                        <p>
                            Todavía no se configuraron
                            reglas de recompensa.
                        </p>

                    </div>

                </div>

            )}


            {/* ==================================
                LISTADO
            ================================== */}

            {!loading &&
            !error &&
            reglas.length > 0 && (

                <div className="admin-rewards-rules">

                    {reglas.map((regla) => (

                        <article
                            className="admin-reward-rule"
                            key={regla._id}
                        >

                            <div>

                                <h2>
                                    {regla.nombre}
                                </h2>

                                <p>
                                    {regla.descripcion ||
                                        "Sin descripción"}
                                </p>

                            </div>


                            <div>

                                <strong>
                                    {regla.tipoRecompensa ===
                                    "porcentaje"

                                        ? `${regla.porcentaje}%`

                                        : `${regla.cantidadRSPY} RSPY`
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Evento:
                                </span>

                                <strong>
                                    {regla.evento}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Estado:
                                </span>

                                <strong>

                                    {regla.activa
                                        ? "🟢 Activa"
                                        : "🔴 Inactiva"
                                    }

                                </strong>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>

    );

}

export default AdminRewards;