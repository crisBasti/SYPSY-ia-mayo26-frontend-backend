function DashboardInsights({ stats }) {

    const insights = [];

    // =============================
    // Sin productos
    // =============================

    if (stats.totalProducts === 0) {

        insights.push({
            icon: "📦",
            type: "info",
            text: "Todavía no publicaste productos."
        });

    }

    // =============================
    // Sin promociones
    // =============================

    if (
        stats.totalProducts > 0 &&
        stats.activePromotions === 0
    ) {

        insights.push({
            icon: "📢",
            type: "warning",
            text: "No tenés promociones activas."
        });

    }

    // =============================
    // Buen tráfico
    // =============================

    if (stats.averageViews >= 100) {

        insights.push({
            icon: "👁",
            type: "success",
            text: "Tus publicaciones reciben muchas visualizaciones."
        });

    }

    // =============================
    // Baja conversión
    // =============================

    if (
        stats.totalViews >= 50 &&
        stats.conversionRate < 2
    ) {

        insights.push({
            icon: "📈",
            type: "warning",
            text: "Tenés muchas vistas pero pocas conversiones."
        });

    }

    // =============================
    // Premium
    // =============================

    if (
        stats.totalProducts > 0 &&
        stats.premiumProducts === 0
    ) {

        insights.push({
            icon: "⭐",
            type: "info",
            text: "Probá convertir un producto en Premium."
        });

    }

    // =============================
    // Producto más visto
    // =============================

    if (stats.mostViewed) {

        insights.push({
            icon: "🔥",
            type: "success",
            text: `Tu producto más visto es "${stats.mostViewed.nombre}".`
        });

    }

    return (

        <div className="dashboard-insights">

            <h2>💡 Insights de SYPSY</h2>

            {

                insights.length === 0

                    ?

                    <p>

                        Todavía no hay suficiente información.

                    </p>

                    :

                    insights.map(

                        (item, index) => (

                            <div

                                key={index}

                                className={`insight-card ${item.type}`}

                            >

                                <span>

                                    {item.icon}

                                </span>

                                <p>

                                    {item.text}

                                </p>

                            </div>

                        )

                    )

            }

        </div>

    );

}

export default DashboardInsights;