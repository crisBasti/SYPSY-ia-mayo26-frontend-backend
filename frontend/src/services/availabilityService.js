import { auth } from "../firebase";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";


// =====================================================
// CONSULTAR DISPONIBILIDAD
// =====================================================

export const consultarDisponibilidad = async (
    productoId
) => {

    const token =
        await auth.currentUser.getIdToken();

    const response =
        await fetch(
            `${API_URL}/api/consultas-disponibilidad`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    productoId
                })
            }
        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            data.mensaje ||
            "Error consultando disponibilidad."
        );

    }

    return data;

};