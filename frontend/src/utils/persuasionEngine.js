import calcularDistancia from "./calcularDistancia";

export default function getPersuasionBadges(product, location) {

    const badges = [];

    const distancia = calcularDistancia(
        location?.lat,
        location?.lng,
        product?.ubicacion?.lat,
        product?.ubicacion?.lng
    );

    // Distancia
    if (distancia !== null) {

        if (distancia < 1) {

            badges.push({
                text: "📍 En tu barrio",
                color: "green",
                priority: 100
            });

        } else if (distancia < 5) {

            badges.push({
                text: `📍 A ${distancia} km`,
                color: "green",
                priority: 95
            });

        } else if (distancia < 15) {

            badges.push({
                text: "🚚 Llega hoy",
                color: "green",
                priority: 90
            });

        }

    }

    // Stock

    if (product.stock <= 3 && product.stock > 0) {

        badges.push({

            text: "⚠ Últimas unidades",

            color: "orange",

            priority: 85

        });

    }

    // Promoción

    if (product.promocionado) {

        badges.push({

            text: "⭐ Recomendado",

            color: "purple",

            priority: 80

        });

    }

    // Publicación reciente

    const dias = Math.floor(

        (Date.now() - new Date(product.createdAt)) /

        (1000 * 60 * 60 * 24)

    );

    if (dias <= 2) {

        badges.push({

            text: "🆕 Recién publicado",

            color: "blue",

            priority: 70

        });

    }

    return badges

        .sort((a, b) => b.priority - a.priority)

        .slice(0, 3);

}