import {
    useEffect,
    useState
} from "react";

import { auth } from "../../firebase";

import {
    obtenerCantidadNoLeidas
} from "../../services/notificationService";


function NotificationBell({ onClick }) {

    const [
        cantidad,
        setCantidad
    ] = useState(0);


    useEffect(() => {

        let activo = true;


        const cargarCantidad = async () => {

            try {

                if (!auth.currentUser) {
                    return;
                }

                const data =
                    await obtenerCantidadNoLeidas();


                if (activo) {

                    setCantidad(
                        data.cantidad || 0
                    );

                }

            }

            catch (error) {

                console.error(
                    "Error cargando notificaciones:",
                    error
                );

            }

        };


        cargarCantidad();


        // ==========================================
        // ACTUALIZACIÓN AUTOMÁTICA
        // ==========================================

        const intervalo =
            setInterval(
                cargarCantidad,
                30000
            );


        return () => {

            activo = false;

            clearInterval(intervalo);

        };

    }, []);


    return (

        <button
            type="button"
            className="notification-bell"
            onClick={onClick}
            aria-label="Notificaciones"
        >

            <span className="notification-icon">
                🔔
            </span>


            {cantidad > 0 && (

                <span className="notification-badge">

                    {cantidad > 99
                        ? "99+"
                        : cantidad}

                </span>

            )}

        </button>

    );

}


export default NotificationBell;