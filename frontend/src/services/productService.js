import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/products`;



// =========================
// OBTENER PRODUCTOS
// =========================

export const getProducts =
  async () => {

    const response =
      await axios.get(API_URL);

    return response.data;
};



// =========================
// CREAR PRODUCTO
// =========================

export const createProductService =
  async (
    productData,
    token
  ) => {

    const response =
      await axios.post(

        API_URL,

        productData,

        {
          headers: {

            Authorization:
              `Bearer ${token}`

          },
        }
      );

    return response.data;
};



// =========================
// ELIMINAR PRODUCTO
// =========================

export const deleteProductService = async ( id, token ) => {

    const response =
      await axios.delete(

        `${API_URL}/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};

//console.log( "API URL:", import.meta.env.VITE_API_URL );


// =========================
// ACTUALIZAR PRODUCTO
// =========================

export const updateProductService =
  async (
    id,
    updatedData,
    token
  ) => {

    const response =
      await axios.put(

        `${API_URL}/${id}`,

        updatedData,

        {
          headers: {

            Authorization:
              `Bearer ${token}`

          },
        }
      );

    return response.data;
};

export const getMyProducts =
  async (token) => {

    const response =
      await axios.get(

        `${API_URL}/mine`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          },
        }
      );

    return response.data;
};

export const incrementViewService = async (

  id,

  source = "unknown",

  search = ""

) => {

  const device =
    window.innerWidth < 768
      ? "mobile"
      : "desktop";

  await axios.post(

    `${API_URL}/${id}/view`,

    {

      source,

      search,

      device

    }

  );

};

export const incrementWhatsappService = async (

  id,

  source = "unknown",

  search = ""

) => {

  const device =
    window.innerWidth < 768
      ? "mobile"
      : "desktop";

  await axios.post(

    `${API_URL}/${id}/whatsapp`,

    {

      source,

      search,

      device

    }

  );

};

export const getMyStats = async (token) => {

  const response = await axios.get(

    `${API_URL}/stats`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

  );

  return response.data;

};

export const reportProductService = async (

  id,

  reason,

  description = ""

) => {

  const response = await axios.post(

    `${API_URL}/${id}/report`,

    {

      reason,

      description

    }

  );

  return response.data;

};

// =========================
// REPORTES (ADMIN)
// =========================

export const getReportsService = async (token) => {

  const response = await axios.get(

    `${import.meta.env.VITE_API_URL}/api/reports`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

  );

  return response.data;

};


export const updateReportStatusService = async (
    reportId,
    status,
    token
) => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/reports/${reportId}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({
                status
            })

        }

    );

    
    if (!response.ok) {

    throw new Error(
        "Error actualizando reporte"
    );

}

return await response.json();

};

export const getUsersService = async () => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/users`

    );

    return await response.json();

};

export const updateUserService = async (

    id,

    data

) => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/users/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type":"application/json"

            },

            body: JSON.stringify(data)

        }

    );

    return await response.json();

};

export const getCurrentUserService = async (token)=>{

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/users/me`,

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    return await response.json();

};

// =========================
// PUBLICIDAD
// =========================

export const getAdvertisementsService = async () => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements`

    );

    return await response.json();

};

export const createAdvertisementService = async (

    data,

    token

) => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify(data)

        }

    );

    return await response.json();

};

export const updateAdvertisementService = async (

    id,

    data,

    token

)=>{

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements/${id}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify(data)

        }

    );

    return await response.json();

};

export const deleteAdvertisementService = async (

    id,

    token

)=>{

    await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements/${id}`,

        {

            method:"DELETE",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

};


// =========================
// PUBLICIDAD ANALYTICS
// =========================


export const registerAdImpressionService = async (id) => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements/${id}/impression`,

        {
            method:"POST"
        }

    );


    return await response.json();

};



export const registerAdClickService = async (id) => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements/${id}/click`,

        {
            method:"POST"
        }

    );


    return await response.json();

};