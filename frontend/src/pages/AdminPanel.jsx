import { useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminReports from "./AdminReports";
import AdminAdvertisements from "./AdminAdvertisements";
import Admin from "./Admin";
import AdminUsers from "../components/admin/AdminUsers";
import AdminOrders from "./AdminOrders";



function AdminPanel() {

    const [section, setSection] = useState("dashboard");

    return (

        <div className="admin-layout">

            <AdminSidebar

                section={section}

                setSection={setSection}

            />

            <main className="admin-content">

                
                {section === "dashboard" && (
                  <AdminDashboard />
                )}

                {section === "users" && (
                  <AdminUsers />
                )}

                {section === "products" && (
                  <Admin />
                )}

                {section === "ads" && (
                    <AdminAdvertisements />
                )}

                {section === "orders" && (
                    <AdminOrders />
                )}

                {section === "reports" && (
                    <AdminReports />
                )}

                {section === "settings" && (
                    <h2>⚙ Configuración General</h2>
                )}

            </main>

        </div>

    );

}

export default AdminPanel;