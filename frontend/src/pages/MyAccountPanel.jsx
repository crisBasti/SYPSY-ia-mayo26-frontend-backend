import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MyAccountSidebar from "../components/MyAccountSidebar";
import Admin from "./Admin";
import MyOrders from "./MyOrders";
import MySales from "./MySales";
import MyProducts from "./MyProducts";
import SellerPanel from "./SellerPanel";
import MyAccount from "./MyAccount";
import Dashboard from "./Dashboard";


function MyAccountPanel(){

    const [searchParams] = useSearchParams();

const [section, setSection] = useState(

    searchParams.get("section") || "dashboard"

);

useEffect(() => {

    const currentSection =

        searchParams.get("section");

    if(currentSection){

        setSection(currentSection);

    }

}, [searchParams]);

    return(

        <div className="admin-layout">

            <MyAccountSidebar

                section={section}

                setSection={setSection}

            />

            <main className="admin-content">

                {

                    section==="dashboard" &&

                    <Dashboard />

                }

                {
                  ["publish", "products", "monetization"].includes(section) &&

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