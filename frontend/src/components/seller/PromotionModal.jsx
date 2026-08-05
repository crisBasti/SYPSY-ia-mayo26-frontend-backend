import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function PromotionModal({ producto, onClose }) {

    const [planes, setPlanes] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        cargarPlanes();

    }, []);

    const cargarPlanes = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/promotions/planes`
            );

            setPlanes(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const contratarPlan = async (plan) => {

        try {

            setLoading(true);

            const token =
                await auth.currentUser.getIdToken();

                console.log("PLAN ENVIADO:", plan);

            const response = await axios.post(

                `${import.meta.env.VITE_API_URL}/api/promotions`,

                {

                    productId: producto._id,

                    plan

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            const promocion = response.data;

            onClose();

            navigate(

                `/promotion-payment/${promocion._id}`

            );

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "No se pudo crear la promoción."

            );

        } finally {

            setLoading(false);

        }

    };

    

    return (

        <div className="promotion-overlay">

            <div className="promotion-modal">

                <button
                    className="promotion-close"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2>

                    🚀 Promocionar producto

                </h2>

                <h3>

                    {producto.nombre}

                </h3>

                <p>

                    Elegí el plan que mejor se adapte a tu publicación.

                </p>

                {

                    planes.map(plan => (

                        <div
                            key={plan.nombre}
                            className="promotion-plan"
                        >

                            <h3>

                                {plan.nombre}

                            </h3>

                            <p>

                                💰 ${plan.precio.toLocaleString()}

                            </p>

                            <p>

                                ⏱ {plan.duracionHoras} horas

                            </p>

                            <button

                                disabled={loading}

                                onClick={() =>
                                  contratarPlan(plan.id)
                                }

                            >

                                🚀 Promocionar

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default PromotionModal;