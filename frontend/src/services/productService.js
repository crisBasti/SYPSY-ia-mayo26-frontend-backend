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
          }
        }
      );

    return response.data;
};

export const incrementViewService =
  async (id) => {

    await axios.post(
      `${API_URL}/${id}/view`
    );

};

export const incrementWhatsappService =
  async (id) => {

    await axios.post(
      `${API_URL}/${id}/whatsapp`
    );

};