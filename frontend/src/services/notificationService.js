import { auth } from "../firebase";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";


// =====================================================
// OBTENER NOTIFICACIONES
// =====================================================

export const obtenerMisNotificaciones = async () => {

    const token =
        await auth.currentUser.getIdToken();

    const response =
        await fetch(
            `${API_URL}/api/notifications`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.message ||
            data.mensaje ||
            "Error obteniendo notificaciones."
        );

    }

    return await response.json();

};


// =====================================================
// OBTENER CANTIDAD NO LEÍDAS
// =====================================================

export const obtenerCantidadNoLeidas = async () => {

    const token =
        await auth.currentUser.getIdToken();

    const response =
        await fetch(
            `${API_URL}/api/notifications/unread-count`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.message ||
            data.mensaje ||
            "Error obteniendo contador."
        );

    }

    return await response.json();

};


// =====================================================
// MARCAR UNA COMO LEÍDA
// =====================================================

export const marcarNotificacionComoLeida =
    async (notificationId) => {

        const token =
            await auth.currentUser.getIdToken();

        const response =
            await fetch(
                `${API_URL}/api/notifications/${notificationId}/read`,
                {
                    method: "PATCH",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        if (!response.ok) {

            const data =
                await response.json();

            throw new Error(
                data.message ||
                data.mensaje ||
                "Error marcando notificación."
            );

        }

        return await response.json();

    };


// =====================================================
// MARCAR TODAS COMO LEÍDAS
// =====================================================

export const marcarTodasComoLeidas = async () => {

    const token =
        await auth.currentUser.getIdToken();

    const response =
        await fetch(
            `${API_URL}/api/notifications/read-all`,
            {
                method: "PATCH",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.message ||
            data.mensaje ||
            "Error marcando notificaciones."
        );

    }

    return await response.json();

};



// =====================================================
// RESPONDER CONSULTA DE DISPONIBILIDAD
// =====================================================

export const responderConsultaDisponibilidad = async (
    consultaId,
    estado,
    respuesta = null
) => {

    const token =
        await auth.currentUser.getIdToken();

    const response =
        await fetch(
            `${API_URL}/api/consultas-disponibilidad/${consultaId}/responder`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    estado,
                    respuesta
                })
            }
        );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.message ||
            data.mensaje ||
            "Error respondiendo consulta de disponibilidad."
        );

    }

    return await response.json();

};