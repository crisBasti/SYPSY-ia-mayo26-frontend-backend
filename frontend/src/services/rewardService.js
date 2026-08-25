import axios from "axios";

const API_URL =
    `${import.meta.env.VITE_API_URL}/api/rewards`;


// ==========================================
// OBTENER MI CUENTA RSPY
// ==========================================

export const getMyRewards = async (token) => {

    const response =
        await axios.get(
            `${API_URL}/mine`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};


// ==========================================
// ADMIN — OBTENER REGLAS
// ==========================================

export const getRewardRules = async (token) => {

    const response =
        await axios.get(
            `${API_URL}/rules`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};


// ==========================================
// ADMIN — OBTENER UNA REGLA
// ==========================================

export const getRewardRule = async (
    id,
    token
) => {

    const response =
        await axios.get(
            `${API_URL}/rules/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};


// ==========================================
// ADMIN — CREAR REGLA
// ==========================================

export const createRewardRule = async (
    data,
    token
) => {

    const response =
        await axios.post(
            `${API_URL}/rules`,
            data,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};


// ==========================================
// ADMIN — ACTUALIZAR REGLA
// ==========================================

export const updateRewardRule = async (
    id,
    data,
    token
) => {

    const response =
        await axios.put(
            `${API_URL}/rules/${id}`,
            data,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};


// ==========================================
// ADMIN — ACTIVAR / DESACTIVAR
// ==========================================

export const toggleRewardRule = async (
    id,
    token
) => {

    const response =
        await axios.patch(
            `${API_URL}/rules/${id}/status`,
            {},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};


// ==========================================
// ADMIN — ELIMINAR REGLA
// ==========================================

export const deleteRewardRule = async (
    id,
    token
) => {

    const response =
        await axios.delete(
            `${API_URL}/rules/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};