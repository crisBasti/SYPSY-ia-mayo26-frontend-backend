import axios from "axios";

const API_URL =
    `${import.meta.env.VITE_API_URL}/api/favorites`;


// =========================
// OBTENER FAVORITOS
// =========================

export const obtenerFavoritos = async (token) => {

    const response = await axios.get(

        API_URL,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};


// =========================
// AGREGAR FAVORITO
// =========================

export const agregarFavorito = async (

    productId,

    token

) => {

    const response = await axios.post(

        `${API_URL}/${productId}`,

        {},

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};


// =========================
// ELIMINAR FAVORITO
// =========================

export const eliminarFavorito = async (

    productId,

    token

) => {

    const response = await axios.delete(

        `${API_URL}/${productId}`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};