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