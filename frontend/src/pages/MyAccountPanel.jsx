import { useState } from "react";

import MyAccountSidebar from "../components/MyAccountSidebar";
import Admin from "./Admin";
import MyOrders from "./MyOrders";
import MySales from "./MySales";
import MyProducts from "./MyProducts";
import SellerPanel from "./SellerPanel";
import MyAccount from "./MyAccount";


function MyAccountPanel(){

    const [section,setSection]=useState("dashboard");

    return(

        <div className="admin-layout">

            <MyAccountSidebar

                section={section}

                setSection={setSection}

            />

            <main className="admin-content">

                {

                    section==="dashboard" &&

                    <h2>

                        👤 Bienvenido a tu cuenta

                    </h2>

                }

                {
                    (section==="publish" || section==="products") &&

                    <SellerPanel section={section} />
                }

                {
                   section==="orders" &&

                   <MyOrders />

                }

                {
                   section==="sales" &&

                   <MySales />

                }

                {

                    section==="stats" &&

                    <h2>

                        📈 Estadísticas

                    </h2>

                }

                {

                    section==="favorites" &&

                    <h2>

                        ❤️ Favoritos

                    </h2>

                }

                {
                    section==="settings" &&

                    <MyAccount />

                }

            </main>

        </div>

    );

}

export default MyAccountPanel;