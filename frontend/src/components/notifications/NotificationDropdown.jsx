import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    obtenerMisNotificaciones,
    marcarNotificacionComoLeida,
    marcarTodasComoLeidas
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


    const manejarClick = async (notificacion) => {

        try {

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


            if (notificacion.accion === "ver_pedido") {

    onClose();

    if (notificacion.referenciaTipo === "venta") {

        navigate(
            `/micuenta?section=sales&orderId=${notificacion.referencia}`
        );

    } else {

        navigate(
            `/micuenta?section=orders&orderId=${notificacion.referencia}`
        );

    }
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

                        <button
                            type="button"
                            key={notificacion._id}
                            className={`
                                notification-item
                                ${
                                    !notificacion.leida
                                        ? "unread"
                                        : ""
                                }
                            `}
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

                    )
                )}

            </div>

        </div>

    );

}


export default NotificationDropdown;