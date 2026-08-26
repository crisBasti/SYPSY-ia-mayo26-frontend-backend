export default function generarMensajeVenta(producto, distancia) {

    const mensajes = [];

    // =====================
    // PROXIMIDAD
    // =====================

    if (distancia != null) {

        if (distancia <= 5) {

            mensajes.push({
                tipo: "success",
                icono: "⚡",
                texto: "Llega hoy"
            });

        } else if (distancia <= 10) {

            mensajes.push({
                tipo: "primary",
                icono: "🚀",
                texto: "Entrega rápida"
            });

        } else if (distancia <= 20) {

            mensajes.push({
                tipo: "info",
                icono: "📦",
                texto: "Entrega local"
            });

        } else if (distancia <= 40) {

            mensajes.push({
                tipo: "warning",
                icono: "🛵",
                texto: "Envío disponible"
            });

        } else {

            mensajes.push({
                tipo: "info",
                icono: "🚚",
                texto: "Envío a tu zona"
            });

        }

    }

    // =====================
    // STOCK
    // =====================

    if (producto.stock <= 2) {

        mensajes.push({
            tipo: "danger",
            icono: "🔥",
            texto: "Quedan pocas unidades"
        });

    }

    // =====================
    // NUEVO
    // =====================

    const dias =
        (Date.now() -
        new Date(producto.createdAt)) /
        86400000;

    if (dias < 7) {

        mensajes.push({
            tipo: "warning",
            icono: "🆕",
            texto: "Publicado recientemente"
        });

    }

    // =====================
    // PROMOCIÓN
    // =====================

    if (producto.nivelPromocion === 3) {

        mensajes.push({
            tipo: "premium",
            icono: "👑",
            texto: "Producto Premium"
        });

    }

    if (producto.nivelPromocion === 2) {

        mensajes.push({
            tipo: "premium",
            icono: "🚀",
            texto: "Más vendido"
        });

    }

    if (producto.nivelPromocion === 1) {

        mensajes.push({
            tipo: "premium",
            icono: "⭐",
            texto: "Promocionado"
        });

    }

    return mensajes.slice(0, 2);
}