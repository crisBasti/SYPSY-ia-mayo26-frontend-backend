export default function getOpportunityBadge(product) {

    const badges = [];

    // ------------------------
    // Cercanía
    // ------------------------

    if (product.distancia !== undefined && product.distancia !== null) {

        if (product.distancia < 1) {

            badges.push({
                color: "green",
                icon: "📍",
                text: "En tu barrio"
            });

        }

        else if (product.distancia < 3) {

            badges.push({
                color: "green",
                icon: "🚲",
                text: "Llega hoy"
            });

        }

        else if (product.distancia < 8) {

            badges.push({
                color: "blue",
                icon: "⚡",
                text: "Entrega rápida"
            });

        }

    }

    // ------------------------
    // Producto nuevo
    // ------------------------

    const diasPublicado = Math.floor(

        (Date.now() - new Date(product.createdAt)) /

        1000 /

        60 /

        60 /

        24

    );

    if (diasPublicado <= 3) {

        badges.push({

            color: "orange",

            icon: "🆕",

            text: "Recién publicado"

        });

    }

    // ------------------------
    // Promocionado
    // ------------------------

    if (product.nivelPromocion === 3) {

        badges.push({

            color: "gold",

            icon: "👑",

            text: "Premium"

        });

    }

    else if (product.nivelPromocion === 2) {

        badges.push({

            color: "purple",

            icon: "🚀",

            text: "Destacado"

        });

    }

    return badges;

}