import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import "../styles/rewardWallet.css";

function RewardWallet() {

    const [reward, setReward] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const cargarRecompensas = async () => {

            try {

                const user = auth.currentUser;

                if (!user) {

                    setError(
                        "Debés iniciar sesión para consultar tus RSPY."
                    );

                    setLoading(false);

                    return;
                }

                const token =
                    await user.getIdToken();

                const response =
                    await axios.get(

                        `${import.meta.env.VITE_API_URL}/api/rewards/mine`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }

                    );

                setReward(response.data);

            } catch (error) {

                console.error(
                    "Error cargando recompensas:",
                    error
                );

                setError(
                    "No se pudieron cargar tus recompensas."
                );

            } finally {

                setLoading(false);

            }

        };


        cargarRecompensas();

    }, []);


    if (loading) {

        return (
            <div className="reward-wallet">

                <h1>🪙 Mis RSPY</h1>

                <p>
                    Cargando tus recompensas...
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="reward-wallet">

                <h1>🪙 Mis RSPY</h1>

                <p>
                    {error}
                </p>

            </div>
        );

    }


    return (

        <div className="reward-wallet">

            <div className="reward-wallet-header">

                <h1>
                    🪙 Mis RSPY
                </h1>

                <p>
                    Tus recompensas dentro del ecosistema SYPSY
                </p>

            </div>


            {/* =====================================
                SALDO PRINCIPAL
            ===================================== */}

            <div className="reward-balance-card">

                <span className="reward-balance-label">
                    Saldo disponible
                </span>

                <strong className="reward-balance">

                    🪙{" "}
                    {reward?.saldo ?? 0}
                    {" "}
                    RSPY

                </strong>
                

            </div>


            {/* =====================================
                RESUMEN
            ===================================== */}

            <div className="reward-summary">

                <div className="reward-summary-card">

                    <span>
                        Ganados
                    </span>

                    <strong>
                        +{reward?.totalGanado ?? 0}
                        {" "}RSPY
                    </strong>

                </div>


                <div className="reward-summary-card">

                    <span>
                        Gastados
                    </span>

                    <strong>
                        {reward?.totalGastado ?? 0}
                        {" "}RSPY
                    </strong>

                </div>

            </div>


            {/* =====================================
                HISTORIAL
            ===================================== */}

            <div className="reward-history">

                <h2>
                    Historial de movimientos
                </h2>


                {!reward?.movimientos ||
                reward.movimientos.length === 0 ? (

                    <div className="reward-empty">

                        <p>
                            Todavía no tenés movimientos RSPY.
                        </p>

                        <span>
                            Tus recompensas aparecerán aquí
                            cuando realices operaciones elegibles.
                        </span>

                    </div>

                ) : (

                    <div className="reward-movements">

                        {[...reward.movimientos]
                            .reverse()
                            .map((movimiento, index) => (

                                <div
                                    className="reward-movement"
                                    key={index}
                                >

                                    <div>

                                        <strong>

                                            {movimiento.tipo === "ganado"
                                                ? "📈 +"
                                                : movimiento.tipo === "gastado"
                                                    ? "📉 -"
                                                    : "⚙️ "
                                            }

                                            {Math.abs(
                                                movimiento.cantidad
                                            )}

                                            {" "}RSPY

                                        </strong>

                                        <p>
                                            {movimiento.concepto}
                                        </p>

                                    </div>


                                    <small>

                                        {movimiento.fecha
                                            ? new Date(
                                                movimiento.fecha
                                            ).toLocaleString("es-AR")
                                            : ""
                                        }

                                    </small>

                                </div>

                            ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default RewardWallet;