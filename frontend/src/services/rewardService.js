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
// ADMIN - OBTENER HISTORIAL RSPY DE USUARIO
// ==========================================

export const getUserRewardTransactions = async (
    uid,
    token
) => {

    const response =
        await axios.get(

            `${API_URL}/admin/${uid}/transactions`,

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
// ADMIN - OBTENER REGLAS RSPY
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
// ADMIN - CREAR REGLA RSPY
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