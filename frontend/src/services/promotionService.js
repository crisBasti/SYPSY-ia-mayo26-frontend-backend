import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registrarImpresion = (productId)=>

axios.post(

`${API}/api/promotions/${productId}/impression`

);

export const registrarClick = (productId)=>

axios.post(

`${API}/api/promotions/${productId}/click`

);


export const subirComprobantePromocion = async (id, archivo, token) => {

    const formData = new FormData();

    formData.append("comprobante", archivo);

    const response = await axios.post(

        `${API}/api/promotions/${id}/upload-proof`,

        formData,

        {

            headers:{

                Authorization:`Bearer ${token}`,

                "Content-Type":"multipart/form-data"

            }

        }

    );

    return response.data;

};

export const verificarPagoPromocion = async (id, accion, token) => {

    const response = await axios.put(

        `${API}/api/promotions/${id}/verify-payment`,

        { accion },

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    return response.data;

};


export const pagarPromocionRSPY = async (id, token) => {

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/promotions/${id}/pagar-rspy`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        throw new Error("Error al pagar con RSPY");
    }

    return res.json();
};