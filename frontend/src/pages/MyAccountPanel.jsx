import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MyAccountSidebar from "../components/MyAccountSidebar";
import MyOrders from "./MyOrders";
import MySales from "./MySales";
import SellerPanel from "./SellerPanel";
import MyAccount from "./MyAccount";
import Favorites from "./Favorites";
import Dashboard from "./Dashboard";


function MyAccountPanel(){

    const [searchParams] = useSearchParams();

    const [section, setSection] = useState(
        searchParams.get("section") || "home"
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
                    section === "home" &&

                    <Dashboard />

                }


                {
                    ["publish", "products", "monetization"].includes(section) &&

                    <SellerPanel section={section} />
                }


                {
                    section === "orders" &&

                    <MyOrders />
                }


                {
                    section === "sales" &&

                    <MySales />
                }


                {
                    section === "favorites" &&

                    <Favorites />
                }


                {
                    section === "settings" &&

                    <MyAccount />
                }


            </main>

        </div>

    );

}

export default MyAccountPanel;