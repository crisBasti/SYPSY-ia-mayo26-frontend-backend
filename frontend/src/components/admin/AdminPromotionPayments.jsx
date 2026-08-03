import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../firebase";

function AdminPromotionPayments() {

    const [promotions, setPromotions] = useState([]);

    useEffect(() => {

        loadPromotions();

    }, []);

    const loadPromotions = async () => {

        const token = await auth.currentUser.getIdToken();

        const res = await axios.get(

            `${import.meta.env.VITE_API_URL}/api/promotions/admin/pending`,

            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        );

        setPromotions(res.data);

    };

    const verifyPayment = async(id,accion)=>{

        const token = await auth.currentUser.getIdToken();

        await axios.put(

            `${import.meta.env.VITE_API_URL}/api/promotions/${id}/verify-payment`,

            {
                accion
            },

            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        );

        loadPromotions();

    };

    return(

        <div>

            <h2>💳 Pagos de Promociones</h2>

            {promotions.map(promo=>(

                <div
                    key={promo._id}
                    className="campaign-card"
                >

                    <h3>{promo.productId?.nombre}</h3>

                    <p>Vendedor: {promo.sellerUid}</p>

                    <p>Plan: {promo.plan.nombre}</p>

                    <p>Estado: {promo.paymentStatus}</p>

                    {
                        promo.comprobantePago &&

                        <a
                            href={promo.comprobantePago}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ver comprobante
                        </a>
                    }

                    <br/><br/>

                    <button
                        onClick={()=>
                            verifyPayment(
                                promo._id,
                                "APROBAR"
                            )
                        }
                    >
                        ✅ Aprobar
                    </button>

                    <button
                        onClick={()=>
                            verifyPayment(
                                promo._id,
                                "RECHAZAR"
                            )
                        }
                    >
                        ❌ Rechazar
                    </button>

                </div>

            ))}

        </div>

    );

}

export default AdminPromotionPayments;