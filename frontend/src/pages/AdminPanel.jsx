import { useState } from "react";

import AdminSidebar from "../components/AdminSidebar";

import Dashboard from "./Dashboard";
import AdminReports from "./AdminReports";
import Admin from "./Admin";
import AdminUsers from "./AdminUsers";
import AdminAdvertisements from "./AdminAdvertisements";

function AdminPanel() {

    const [section, setSection] = useState("dashboard");

    return (

        <div className="admin-layout">

            <AdminSidebar

                section={section}

                setSection={setSection}

            />

            <main className="admin-content">

                {

                    section === "dashboard" &&

                    <Dashboard />

                }

                {

                    section === "reports" &&

                    <AdminReports />

                }

                {
                    section === "products" &&

                    <Admin />
                }

                {

                   section === "users" &&

                   <AdminUsers />

                }

                {

                    section === "analytics" &&

                    <h2>📈 Analytics (próximamente)</h2>

                }

                {

                   section==="advertisements" &&

                   <AdminAdvertisements />

                }

                {

                    section === "settings" &&

                    <h2>⚙ Configuración (próximamente)</h2>

                }

            </main>

        </div>

    );

}

export default AdminPanel;