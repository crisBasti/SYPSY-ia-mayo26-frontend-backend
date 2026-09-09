import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    obtenerMisNotificaciones,
    marcarNotificacionComoLeida,
    marcarTodasComoLeidas,
    responderConsultaDisponibilidad
} from "../../services/notificationService";


function NotificationDropdown({ onClose }) {

    const navigate = useNavigate();

    const [
        notificaciones,
        setNotificaciones
    ] = useState([]);

    const [
        cargando,
        setCargando
    ] = useState(true);


    const cargarNotificaciones = async () => {

        try {

            setCargando(true);

            const data =
                await obtenerMisNotificaciones();

            setNotificaciones(data);

        }

        catch (error) {

            console.error(
                "Error cargando notificaciones:",
                error
            );

        }

        finally {

            setCargando(false);

        }

    };


    useEffect(() => {

        cargarNotificaciones();

    }, []);


    const responderDisponibilidad = async (
        notificacion,
        estado
    ) => {

        try {

            await responderConsultaDisponibilidad(
                notificacion.referencia,
                estado
            );

            setNotificaciones(
                prev =>
                    prev.map(item =>
                        item._id === notificacion._id
                            ? {
                                ...item,
                                leida: true,
                                accion: null
                            }
                            : item
                    )
            );

        }

        catch (error) {

            console.error(
                "Error respondiendo disponibilidad:",
                error
            );

            alert(
                error.message ||
                "No se pudo responder la consulta."
            );

        }

    };


    const manejarClick = async (notificacion) => {

        try {

            // Marcar como leída
            if (!notificacion.leida) {

                await marcarNotificacionComoLeida(
                    notificacion._id
                );

                setNotificaciones(
                    prev =>
                        prev.map(item =>
                            item._id === notificacion._id
                                ? {
                                    ...item,
                                    leida: true
                                }
                                : item
                        )
                );

            }


            // Notificación relacionada con un pedido
            if (notificacion.accion === "ver_pedido") {

                onClose();

                if (
                    notificacion.referenciaTipo === "venta"
                ) {

                    navigate(
                        `/micuenta?section=sales&orderId=${notificacion.referencia}`
                    );

                } else {

                    navigate(
                        `/micuenta?section=orders&orderId=${notificacion.referencia}`
                    );

                }

                return;
            }


            // Producto confirmado como disponible
            if (
                notificacion.accion === "comprar_producto"
            ) {

                const productoId =
                    notificacion.metadata?.productoId;

                if (!productoId) {

                    console.error(
                        "La notificación no contiene productoId."
                    );

                    return;
                }

                onClose();

                navigate(
                    `/producto/${productoId}`
                );

                return;
            }


            // Producto informado como no disponible
            if (
                notificacion.accion === "ver_consulta"
            ) {

                onClose();

                return;
            }

        }

        catch (error) {

            console.error(
                "Error procesando notificación:",
                error
            );

        }

    };


    const marcarTodas = async () => {

        try {

            await marcarTodasComoLeidas();

            setNotificaciones(
                prev =>
                    prev.map(item => ({
                        ...item,
                        leida: true
                    }))
            );

        }

        catch (error) {

            console.error(
                "Error marcando notificaciones:",
                error
            );

        }

    };


    return (

        <div className="notification-dropdown">

            <div className="notification-header">

                <h3>
                    🔔 Notificaciones
                </h3>

                <button
                    type="button"
                    onClick={onClose}
                    className="notification-close"
                >
                    ✕
                </button>

            </div>


            {notificaciones.some(
                notification => !notification.leida
            ) && (

                <button
                    type="button"
                    className="notification-read-all"
                    onClick={marcarTodas}
                >
                    Marcar todas como leídas
                </button>

            )}


            <div className="notification-list">

                {cargando && (

                    <div className="notification-empty">
                        Cargando...
                    </div>

                )}


                {!cargando &&
                    notificaciones.length === 0 && (

                    <div className="notification-empty">
                        No tenés notificaciones.
                    </div>

                )}


                {!cargando &&
                    notificaciones.map(
                        notificacion => (

                        <div
                            key={notificacion._id}
                            className={`
                                notification-item
                                ${
                                    !notificacion.leida
                                        ? "unread"
                                        : ""
                                }
                            `}
                        >

                            <button
                                type="button"
                                className="notification-content"
                                onClick={() =>
                                    manejarClick(
                                        notificacion
                                    )
                                }
                            >

                                <div className="notification-item-title">
                                    {notificacion.titulo}
                                </div>

                                <div className="notification-item-message">
                                    {notificacion.mensaje}
                                </div>

                                <div className="notification-item-date">
                                    {new Date(
                                        notificacion.createdAt
                                    ).toLocaleString(
                                        "es-AR"
                                    )}
                                </div>

                            </button>


                            {notificacion.accion ===
                                "responder_disponibilidad" && (

                                <div className="availability-actions">

                                    <button
                                        type="button"
                                        className="availability-btn available"
                                        onClick={() =>
                                            responderDisponibilidad(
                                                notificacion,
                                                "disponible"
                                            )
                                        }
                                    >
                                        🟢 Disponible
                                    </button>

                                    <button
                                        type="button"
                                        className="availability-btn unavailable"
                                        onClick={() =>
                                            responderDisponibilidad(
                                                notificacion,
                                                "no_disponible"
                                            )
                                        }
                                    >
                                        🔴 No disponible
                                    </button>

                                </div>

                            )}

                        </div>

                    )
                )}

            </div>

        </div>

    );

}


export default NotificationDropdown;