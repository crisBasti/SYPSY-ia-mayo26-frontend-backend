import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import "../styles/promotionPayment.css";

function PromotionPayment() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [promotion, setPromotion] = useState(null);

    const [config, setConfig] = useState(null);

    const [comprobante, setComprobante] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        cargarDatos();

    }, [id]);

    const cargarDatos = async () => {

        try {

            const token = await auth.currentUser.getIdToken();

            const [promo, configuracion] = await Promise.all([

    axios.get(

        `${import.meta.env.VITE_API_URL}/api/promotions/${id}`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    ),

    axios.get(

        `${import.meta.env.VITE_API_URL}/api/configuration`

    )

]);

            setPromotion(promo.data);

            setConfig(configuracion.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const enviarComprobante = async () => {

        if (!comprobante) {

            return alert("Seleccione un comprobante.");

        }

        try {

            const token = await auth.currentUser.getIdToken();

            const formData = new FormData();

            formData.append(

                "comprobante",

                comprobante

            );

            await axios.post(

                `${import.meta.env.VITE_API_URL}/api/promotions/${promotion._id}/upload-proof`,

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert(

                "✅ Comprobante enviado correctamente."

            );

            navigate("/micuenta/monetizacion");

        }

        catch (error) {

            console.error(error);

            alert(

                "No se pudo enviar."

            );

        }

    };

    if (loading) {

        return <h2>Cargando...</h2>;

    }

    if (!promotion) {

        return <h2>Promoción no encontrada.</h2>;

    }

    return (

        <div className="promotion-payment-page">

            <h1>

                🚀 Pago de Promoción

            </h1>

            <p className="payment-subtitle">

              Estás a un solo paso de destacar tu publicación.

            </p>

            <hr />

            <h2>

                {promotion.productId?.nombre}

            </h2>

            <p>

                <strong>Plan:</strong>{" "}

                {promotion.plan.nombre}

            </p>

            <p>

                <strong>Importe:</strong>{" "}

                ${promotion.plan.precio}

            </p>

            <hr />

            <h2>

                💳 Datos para Transferencia

            </h2>

            <div className="transfer-card">

    <h3>

        💳 Cuenta Oficial de SYPSY

    </h3>

    <div className="transfer-row">

        <span>Alias</span>

        <strong>

            {config?.mercadoPago?.alias}

        </strong>

        <button

            onClick={()=>

                navigator.clipboard.writeText(

                    config?.mercadoPago?.alias

                )

            }

              >

                  📋

                </button>

              </div>

              <div className="transfer-row">

                  <span>CVU</span>

                  <strong>

                    {config?.mercadoPago?.cvu}

                  </strong>

                <button

                  onClick={()=>

                      navigator.clipboard.writeText(

                      config?.mercadoPago?.cvu

                    )

                  }

                >

                  📋

                </button>

              </div>

              <div className="transfer-row">

                <span>Titular</span>

                <strong>

                  {config?.mercadoPago?.titular}

                </strong>

              </div>

            </div>

            <hr />

            <h2>

             📤 Subí el comprobante

            </h2>

            <p>

              Una vez verificado por SYPSY, tu promoción comenzará automáticamente.

            </p>

            <input

                type="file"

                accept="image/*"

                onChange={(e)=>

                    setComprobante(

                        e.target.files[0]

                    )

                }

            />

            <br />

            <br />

            <button

              className="promotion-send-btn"

              onClick={enviarComprobante}

            >

              🚀 Enviar comprobante

            </button>

        </div>

    );

}

export default PromotionPayment;