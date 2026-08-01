import { useEffect, useState } from "react";
import { auth } from "../firebase";

import { getMyStats } from "../services/productService";

import StatCard from "../components/dashboard/StatCard";
import ProductsTable from "../components/dashboard/ProductsTable";
import ProductsChart from "../components/dashboard/ProductsChart";
import "../styles/dashboard.css";
import DashboardInsights from "../components/dashboard/DashboardInsights";
import DashboardQuickActions from "../components/dashboard/DashboardQuickActions";

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

          <div className="dashboard-header">

            <div>

              <h1>
                  👋 Hola {auth.currentUser?.displayName || "Vendedor"}
              </h1>

              <p className="dashboard-subtitle">
                  Centro de Control de tu negocio en SYPSY
              </p>

            </div>

            <div className="dashboard-date">

              <span>
                  📅 {new Date().toLocaleDateString("es-AR")}
              </span>

            </div>

          </div>

            <div className="stats-grid">

                <StatCard
                  title="Productos"
                  value={stats.totalProducts}
                  subtitle="Publicados"
                  icon="📦"
                />

                <StatCard
                  title="Visualizaciones"
                  value={stats.totalViews}
                  subtitle="Acumuladas"
                  icon="👁"
                />

                <StatCard
                  title="Pedidos"
                  value={stats.totalOrders}
                  subtitle="Generados"
                  icon="🛒"
                />

                <StatCard
                  title="Conversión"
                  value={`${stats.conversionRate}%`}
                  subtitle="Rendimiento"
                  icon="📈"
                />

                <StatCard
                  title="Promociones"
                  subtitle="En curso"
                  value={stats.activePromotions}
                  icon="📢"
                />

                <StatCard
                  title="Premium"
                  subtitle="Activos"
                  value={stats.premiumProducts}
                  icon="⭐"
                />

                <StatCard
                  title="Destacados"
                  subtitle="Publicados"
                  value={stats.featuredProducts}
                  icon="🚀"
                />

                <StatCard
                  title="Ingresos"
                  subtitle="Acumulados"
                  value={`$ ${stats.totalRevenue.toLocaleString()}`}
                  icon="💰"
                />

            </div>

            <div className="summary-box">

              <h2>📌 Resumen</h2>

                <p>
                  🔥 Producto más visto:
                  <strong>
                    {" "}
                    {stats.mostViewed
                      ? stats.mostViewed.nombre
                      : "Sin datos"}
                  </strong>
                </p>

                <p>
                  📲 Producto con más contactos:
                  <strong>
                    {" "}
                    {stats.mostContacted
                      ? stats.mostContacted.nombre
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


            <div className="summary-box">

              <h2>💰 Centro de Monetización</h2>

              <p>
                📢 Promociones activas:
                <strong> {stats.activePromotions}</strong>
              </p>

              <p>
                ⭐ Productos Premium:
                <strong> {stats.premiumProducts}</strong>
              </p>

              <p>
                🚀 Productos Destacados:
                <strong> {stats.featuredProducts}</strong>
              </p>

              <p>
                💰 Ingresos generados:
                  <strong>
                    {" "}
                    $ {stats.totalRevenue.toLocaleString()}
                  </strong>
              </p>

            </div>


            <DashboardInsights
              stats={stats}
            />

            <DashboardInsights
              stats={stats}
            />

            <DashboardQuickActions />


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
            title="📲 Contactos generados"
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