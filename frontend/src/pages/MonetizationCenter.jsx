import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";

function MonetizationCenter() {

    const [promociones, setPromociones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        cargarPromociones();

    }, []);

    const cargarPromociones = async () => {

        try {

            const token =
                await auth.currentUser.getIdToken();

            const res = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/promotions/mine`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setPromociones(res.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="monetization-container">

            <h2>

              🚀 Centro de Monetización
              
            </h2>

            {loading ? (

                <p>Cargando...</p>

            ) : promociones.length === 0 ? (

                <p>No tenés promociones todavía.</p>

            ) : (

                <div className="campaigns-list">

                    {promociones.map(promo => (

                        <div
                            key={promo._id}
                            className="campaign-card"
                        >

                            <h3>
                                {promo.productId?.nombre}
                            </h3>

                            <p>
                                Plan: {promo.plan.nombre}
                            </p>

                            <p>
                                Estado: {promo.estado}
                            </p>

                            <p>
                                Inicio: {promo.fechaInicio
                                    ? new Date(promo.fechaInicio).toLocaleDateString()
                                    : "-"
                                }
                            </p>

                            <p>
                                Fin: {promo.fechaFin
                                    ? new Date(promo.fechaFin).toLocaleDateString()
                                    : "-"
                                }
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default MonetizationCenter;