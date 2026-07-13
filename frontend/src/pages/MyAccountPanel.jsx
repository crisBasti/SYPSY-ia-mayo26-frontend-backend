import { useState } from "react";

import MyAccountSidebar from "../components/MyAccountSidebar";
import Admin from "./Admin";

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

                    section==="publish" &&

                    <Admin />

                }

                {

                   section==="products" &&

                   <Admin />

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

                    <h2>

                        ⚙ Configuración

                    </h2>

                }

            </main>

        </div>

    );

}

export default MyAccountPanel;