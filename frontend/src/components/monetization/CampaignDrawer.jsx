
import { useState } from "react";
import { auth } from "../../firebase";
import { subirComprobantePromocion } from "../../services/promotionService";
import { pagarPromocionRSPY } from "../../services/promotionService";



function CampaignDrawer({ campaign, config, onClose }) {

    const [archivo, setArchivo] = useState(null);
    const [subiendo, setSubiendo] = useState(false);
    
    if (!campaign) return null;


    const calcularDiasRestantes = () => {

    if (!campaign.fechaFin) return 0;

    const hoy = new Date();

    const fin = new Date(
        campaign.fechaFin
    );

    const diferencia =
        fin - hoy;

    return Math.max(
        0,
        Math.ceil(
            diferencia /
            (1000 * 60 * 60 * 24)
        )
    );

};


const ctr = campaign.impresiones
    ? (
        campaign.clicks /
        campaign.impresiones *
        100
      ).toFixed(2)
    : 0;


const costoPorClick =
    campaign.clicks > 0
    ?
    (
        campaign.plan?.precio /
        campaign.clicks
    ).toFixed(2)
    :
    0;

    return (

        <div className="campaign-drawer-overlay">

            <div className="campaign-drawer">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2>
                    📈 {campaign.productId?.nombre}
                </h2>

                <div className="promotion-hero">

    <div className="hero-icon">

        🚀

    </div>

    <h3>

        Impulsá esta publicación

    </h3>

    <p>

        Llegá a muchos más compradores y aumentá las posibilidades de vender más rápido.

    </p>

</div>

                <hr />

                <div className="campaign-metrics">

                  <p>
                    👁 <strong>Impresiones:</strong>{" "}
                    {campaign.impresiones || 0}
                  </p>


                  <p>
                    🖱 <strong>Clicks:</strong>{" "}
                    {campaign.clicks || 0}
                  </p>


                  <p>
                    📊 <strong>CTR:</strong>{" "}
                    {ctr}%
                  </p>


                  <p>
                    💬 <strong>Contactos:</strong>{" "}
                    {campaign.contactosWhatsapp || 0}
                  </p>


                  <p>
                    🛒 <strong>Compras:</strong>{" "}
                    {campaign.orders || 0}
                  </p>


                  <p>
                    💰 <strong>Costo por click:</strong>{" "}
                    ${costoPorClick}
                  </p>


                  <p>
                    ⏳ <strong>Días restantes:</strong>{" "}
                    {calcularDiasRestantes()}
                  </p>

                </div>

                {campaign.estado === "pendiente_pago" && config && (

<div className="payment-card">

    <h3>
        🚀 Activá tu campaña
    </h3>

    <p className="payment-text">

        Tu publicación comenzará a mostrarse a más compradores apenas se confirme el pago.

    </p>

    <div className="promotion-benefits">

    <div className="benefit-card">

        👀

        <strong>

            Más visualizaciones

        </strong>

        <span>

            Tu publicación aparece antes que las demás.

        </span>

    </div>

    <div className="benefit-card">

        📍

        <strong>

            Más compradores cercanos

        </strong>

        <span>

            Priorizamos usuarios de tu zona.

        </span>

    </div>

    <div className="benefit-card">

        ⚡

        <strong>

            Más ventas

        </strong>

        <span>

            Aumentás las probabilidades de recibir consultas.

        </span>

    </div>

</div>

    <div className="payment-summary">

    <span className="summary-label">

        Inversión

    </span>

    <span className="summary-price">

        ${campaign.plan?.precio}

    </span>

    <div className="rspy-payment-section">

    <button
        className="rspy-pay-btn"
        onClick={async () => {

            try {

                const token =
                    await auth.currentUser.getIdToken();

                await pagarPromocionRSPY(
                    campaign._id,
                    token
                );

                alert(
                    "🚀 Promoción activada con RSPY"
                );

                window.location.reload();

            } catch (err) {

                alert(err.message);

            }

        }}
    >
        🟣 Pagar con RSPY
    </button>


    {campaign.estado === "pendiente_pago" && (

        <p className="rspy-balance-info">

            Podés pagar esta promoción
            usando tus RSPY.

        </p>

    )}

</div>

    <span className="summary-description">

        Esta inversión destacará tu producto durante
        <strong>
          {campaign.plan?.duracionHoras >= 24
          ? `${campaign.plan.duracionHoras / 24} día${campaign.plan.duracionHoras > 24 ? "s" : ""}`
          : `${campaign.plan?.duracionHoras} horas`}

        </strong>

    </span>

</div>

    <a

        className="mercadopago-main-btn"

        href={`https://link.mercadopago.com.ar/${config.mercadoPago.linkPago}`}

        target="_blank"

        rel="noreferrer"

    >

        💳 Abonar ahora con Mercado Pago

    </a>

    <p className="payment-help">

      Si el botón de Mercado Pago no abre correctamente o preferís realizar una transferencia manual, podés utilizar los datos de la cuenta que aparecen debajo. Luego simplemente subí el comprobante y nuestro equipo activará tu campaña apenas verifique el pago.

    </p>


    <div className="payment-data">

        <p>

            Alias:
            <strong>

                {config.mercadoPago.alias}

            </strong>

        </p>

        <p>

            Titular:
            <strong>

                {config.mercadoPago.titular}

            </strong>

        </p>

    </div>

    <hr />

    <h4>

        📤 Ya realizaste el pago

    </h4>

    <input

        type="file"

        accept="image/*,.pdf"

        onChange={(e)=>setArchivo(e.target.files[0])}

    />

    <button

        className="upload-btn"

        disabled={!archivo || subiendo}

        onClick={async()=>{

            try{

                setSubiendo(true);

                const token=await auth.currentUser.getIdToken();

                await subirComprobantePromocion(

                    campaign._id,

                    archivo,

                    token

                );

                alert("Comprobante enviado.");

                window.location.reload();

            }

            finally{

                setSubiendo(false);

            }

        }}

    >

        {subiendo

            ? "Enviando..."

            : "📤 Enviar comprobante"}

    </button>

</div>

)}

            </div>

        </div>

    );

}

export default CampaignDrawer;