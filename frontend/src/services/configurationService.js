import api from "./api";

export const obtenerConfiguracion = async (token) => {

    const response = await api.get(

        "/configuration",

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

export const guardarConfiguracion = async (

    datos,

    token

) => {

    const response = await api.put(

        "/configuration",

        datos,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};