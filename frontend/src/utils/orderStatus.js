export const ORDER_STATUS = {
    pendiente: {
        text: "🟡 Pendiente",
        color: "#FFC107"
    },
    aceptado: {
        text: "🟢 Aceptado",
        color: "#28A745"
    },
    preparando: {
        text: "📦 Preparando",
        color: "#17A2B8"
    },
    entregado: {
        text: "🚚 Entregado",
        color: "#6F42C1"
    },
    finalizado: {
        text: "✅ Finalizado",
        color: "#198754"
    },
    cancelado: {
        text: "❌ Cancelado",
        color: "#DC3545"
    }
};

export const PAYMENT_STATUS = {
    pendiente: {
        text: "⚪ Esperando comprobante",
        color: "#999"
    },
    pendiente_verificacion: {
        text: "🟡 Comprobante enviado",
        color: "#FFC107"
    },
    retenido: {
        text: "🟢 Pago aprobado",
        color: "#28A745"
    },
    rechazado: {
        text: "🔴 Pago rechazado",
        color: "#DC3545"
    }
};