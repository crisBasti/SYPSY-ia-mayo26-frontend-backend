import axios from "axios";

const API_URL =
  "http://localhost:3000/api/products";



export const getProducts =
  async () => {

    const response =
      await axios.get(API_URL);

    return response.data;
};




export const createProductService =
  async (productData) => {

    const response =
      await axios.post(

        API_URL,

        productData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};




export const deleteProductService =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return response.data;
};




export const updateProductService =
  async (
    id,
    updatedData
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        updatedData
      );

    return response.data;
};