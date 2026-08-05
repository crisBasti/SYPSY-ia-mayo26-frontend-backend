import getDeliveryBadge from "../utils/getDeliveryBadge";
import { useLocation } from "../context/LocationContext";
import calcularDistancia from "../utils/calcularDistancia";

function TrustBadges({ product }) {

    const location = useLocation();

    const badge = getDeliveryBadge(product, location);

    const distancia = calcularDistancia(
        location?.lat,
        location?.lng,
        product?.ubicacion?.lat,
        product?.ubicacion?.lng
    );

    return (

        <div className="trust-badges">

            {badge && (

                <span className={`trust-badge ${badge.color}`}>

                    {badge.icon} {badge.text}

                </span>

            )}

            {distancia && (

                <span className="trust-badge distance">

                    📍 {distancia} km

                </span>

            )}

            {product?.vendedor?.verificado && (

                <span className="trust-badge verified">

                    🛡️ Verificado

                </span>

            )}

        </div>

    );

}

export default TrustBadges;