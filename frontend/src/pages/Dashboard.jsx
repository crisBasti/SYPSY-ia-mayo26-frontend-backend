import { useEffect, useState } from "react";
import { auth } from "../firebase";

import { getMyStats } from "../services/productService";

import StatCard from "../components/dashboard/StatCard";
import ProductsTable from "../components/dashboard/ProductsTable";
import ProductsChart from "../components/dashboard/ProductsChart";
import "../styles/dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadStats = async () => {

            try {

                const token =
                    await auth.currentUser.getIdToken();

                const data =
                    await getMyStats(token);

                setStats(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadStats();

    }, []);

    if (loading) {

        return <h2>Cargando estadísticas...</h2>;

    }

    if (!stats) {

        return <h2>No se pudieron cargar las estadísticas.</h2>;

    }

    return (

        <div className="dashboard">

            <h1>

                📊 Panel del vendedor

            </h1>

            <div className="stats-grid">

                <StatCard
                    title="Productos"
                    value={stats.totalProducts}
                    icon="📦"
                />

                <StatCard
                    title="Visualizaciones"
                    value={stats.totalViews}
                    icon="👁"
                />

                <StatCard
                    title="WhatsApp"
                    value={stats.totalWhatsappClicks}
                    icon="📲"
                />

                <StatCard
                    title="Conversión"
                    value={`${stats.conversionRate}%`}
                    icon="📈"
                />

            </div>

            <div className="summary-box">

    <h2>📌 Resumen</h2>

    <p>
        🔥 Producto más visto:
        <strong>
            {" "}
            {stats.mostViewedProduct
                ? stats.mostViewedProduct.nombre
                : "Sin datos"}
        </strong>
    </p>

    <p>
        📲 Producto más consultado:
        <strong>
            {" "}
            {stats.mostWhatsappProduct
                ? stats.mostWhatsappProduct.nombre
                : "Sin datos"}
        </strong>
    </p>

    <p>
        👁 Promedio de vistas por producto:
        <strong>
            {" "}
            {stats.averageViews}
        </strong>
    </p>

</div>

            <h2>

                📦 Rendimiento de mis publicaciones

            </h2>

            <div className="charts">

    <div className="chart-box">

        <ProductsChart
            products={stats.products}
            dataKey="views"
            title="👁 Visualizaciones por producto"
            color="#2563eb"
        />

    </div>

    <div className="chart-box">

        <ProductsChart
            products={stats.products}
            dataKey="whatsappClicks"
            title="📲 Consultas por WhatsApp"
            color="#22c55e"
        />

    </div>

</div>

            <ProductsTable
                products={stats.products}
            />

        </div>

    );

}

export default Dashboard;