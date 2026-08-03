import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import CampaignDrawer from "../components/monetization/CampaignDrawer";
import { obtenerConfiguracion } from "../services/configurationService";


function MonetizationCenter() {

    const [promociones, setPromociones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [config, setConfig] = useState(null);

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

        const configuration =
          await obtenerConfiguracion(token);

            setConfig(configuration);

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

                <table className="campaigns-table">

    <thead>

        <tr>

            <th>Producto</th>

            <th>Plan</th>

            <th>Estado</th>

            <th>Inversión</th>

            <th>👁 Imp.</th>

            <th>🖱 Clicks</th>

            <th>💬 Contactos</th>

            <th>🛒 Compras</th>

            <th>Acciones</th>

        </tr>

    </thead>

    <tbody>

        {promociones.map((promo) => (

            <tr key={promo._id}>

                <td>

                    {promo.productId?.nombre || "-"}

                </td>

                <td>

                    {promo.plan?.nombre}

                </td>

                <td>

                    {promo.estado}

                </td>

                

                <td>

                    ${promo.plan?.precio}

                </td>

                <td>

                    {promo.impresiones ?? promo.estadisticas?.impresiones ?? 0}

                </td>

                <td>

                    {promo.clicks ?? promo.estadisticas?.clicks ?? 0}

                </td>

                <td>

                    {promo.contactosWhatsapp ??
                        promo.estadisticas?.contactosWhatsapp ??
                        0}

                </td>

                <td>

                    {promo.orders ??
                        promo.estadisticas?.compras ??
                        0}

                </td>

                <td>

                    <button
                      onClick={() => setSelectedCampaign(promo)}
                    >

                      📈 Ver

                    </button>

                </td>

            </tr>

        ))}

    </tbody>

</table>

            )}

            <CampaignDrawer
    campaign={selectedCampaign}
    config={config}
    onClose={() => setSelectedCampaign(null)}
/>

        </div>

    );

}

export default MonetizationCenter;