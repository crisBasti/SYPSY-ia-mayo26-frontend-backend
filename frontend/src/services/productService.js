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

export const deleteProductService =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return response.data;
};



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