
import { useState } from "react";
import { auth } from "../../firebase";
import { subirComprobantePromocion } from "../../services/promotionService";





function CampaignDrawer({ campaign, config, onClose }) {

    if (!campaign) return null;

    const [archivo, setArchivo] = useState(null);
    const [subiendo, setSubiendo] = useState(false);


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

                {campaign.estado === "pendiente_pago" &&
                  config && (

        <>

            <hr />

            <h3>💳 Pago de la campaña</h3>

            <p>
                <strong>Alias:</strong>{" "}
                {config.mercadoPago?.alias || "-"}
            </p>

            <p>
                <strong>CVU:</strong>{" "}
                {config.mercadoPago?.cvu || "-"}
            </p>

            <p>
                <strong>Titular:</strong>{" "}
                {config.mercadoPago?.titular || "-"}
            </p>

            <input
    type="file"
    accept="image/*,.pdf"
    onChange={(e)=>setArchivo(e.target.files[0])}
/>

<button

    className="buy-btn"

    disabled={!archivo || subiendo}

    onClick={async()=>{

        try{

            setSubiendo(true);

            const token =

                await auth.currentUser.getIdToken();

            await subirComprobantePromocion(

                campaign._id,

                archivo,

                token

            );

            alert("✅ Comprobante enviado.");

            window.location.reload();

        }

        catch(error){

            console.error(error);

            alert("Error enviando comprobante.");

        }

        finally{

            setSubiendo(false);

        }

    }}

>

    {subiendo ? "Enviando..." : "📤 Enviar comprobante"}

</button>

        </>

    )
}



                <hr />

                <h3>📊 Rendimiento</h3>

                <p>
                    CTR:{" "}
                    {campaign.impresiones
                        ? (
                            campaign.clicks /
                            campaign.impresiones *
                            100
                        ).toFixed(2)
                        : 0}
                    %
                </p>

            </div>

        </div>

    );

}

export default CampaignDrawer;