import api from "./api";

export const obtenerResumenFinanciero = async (token) => {

    const response = await api.get(

        "/finance/resumen",

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};