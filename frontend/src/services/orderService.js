import axios from "axios";


const API_URL =
`${import.meta.env.VITE_API_URL}/api/orders`;


// Crear pedido

export const crearPedidoService = async (

    pedido,

    token

) => {

    const response = await axios.post(

        API_URL,

        pedido,

        {
            headers: {

                Authorization:
                `Bearer ${token}`

            }
        }

    );

    return response.data;

};


// Obtener mis compras

export const obtenerMisComprasService = async (

    token

) => {

    const response = await axios.get(

        `${API_URL}/mis-compras`,

        {
            headers: {

                Authorization:
                `Bearer ${token}`

            }
        }

    );

    return response.data;

};


// Obtener mis ventas

export const obtenerMisVentasService = async (

    token

) => {

    const response = await axios.get(

        `${API_URL}/mis-ventas`,

        {
            headers: {

                Authorization:
                `Bearer ${token}`

            }
        }

    );

    return response.data;

};