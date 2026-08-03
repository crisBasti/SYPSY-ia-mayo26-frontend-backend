import { useEffect, useState } from "react";
import { auth } from "../../firebase";

import {

    obtenerConfiguracion,

    guardarConfiguracion

} from "../../services/configurationService";

function AdminSettings() {

    const [config, setConfig] = useState({

    comisionGeneral: 5,

    comisionPremium: 3,

    comisionServicios: 8,

    mercadoPago: {

        alias: "",

        cvu: "",

        titular: "",

        qr: ""

    }

});

    useEffect(() => {

        cargarConfiguracion();

    }, []);

    const cargarConfiguracion = async () => {

        try{

            const token =
                await auth.currentUser.getIdToken();

            const datos =
                await obtenerConfiguracion(token);

            setConfig(datos);

        }

        catch(error){

            console.error(error);

        }

    };

    const guardar = async () => {

        try{

            const token =
                await auth.currentUser.getIdToken();

            await guardarConfiguracion(

                config,

                token

            );

            alert("✅ Configuración guardada.");

        }

        catch(error){

            console.error(error);

            alert("Error al guardar.");

        }

    };

    return (

        <div className="settings-container">

            <h2>⚙ Configuración General</h2>

            <div className="settings-grid">

                <section className="settings-card">

                    <h3>💰 Comisiones</h3>

                    <div className="settings-field">

                        <label>

                            Comisión General

                        </label>

                        <input

                            type="number"

                            value={config.comisionGeneral}

                            onChange={(e)=>

                                setConfig({

                                    ...config,

                                    comisionGeneral:Number(e.target.value)

                                })

                            }

                        />

                    </div>

                    <div className="settings-field">

                        <label>

                            Comisión Premium

                        </label>

                        <input

                            type="number"

                            value={config.comisionPremium}

                            onChange={(e)=>

                                setConfig({

                                    ...config,

                                    comisionPremium:Number(e.target.value)

                                })

                            }

                        />

                    </div>

                    <div className="settings-field">

                        <label>

                            Comisión Servicios

                        </label>

                        <input

                            type="number"

                            value={config.comisionServicios}

                            onChange={(e)=>

                                setConfig({

                                    ...config,

                                    comisionServicios:Number(e.target.value)

                                })

                            }

                        />

                    </div>

                    <button

                        className="settings-save"

                        onClick={guardar}

                    >

                        💾 Guardar

                    </button>

                </section>


                <section className="settings-card">

    <h3>💳 Mercado Pago</h3>

    <div className="settings-field">

        <label>Alias</label>

        <input

            type="text"

            value={config.mercadoPago?.alias || ""}

            onChange={(e)=>

                setConfig({

                    ...config,

                    mercadoPago:{

                        ...config.mercadoPago,

                        alias:e.target.value

                    }

                })

            }

        />

    </div>

    <div className="settings-field">

        <label>CVU</label>

        <input

            type="text"

            value={config.mercadoPago?.cvu || ""}

            onChange={(e)=>

                setConfig({

                    ...config,

                    mercadoPago:{

                        ...config.mercadoPago,

                        cvu:e.target.value

                    }

                })

            }

        />

    </div>

    <div className="settings-field">

        <label>Titular</label>

        <input

            type="text"

            value={config.mercadoPago?.titular || ""}

            onChange={(e)=>

                setConfig({

                    ...config,

                    mercadoPago:{

                        ...config.mercadoPago,

                        titular:e.target.value

                    }

                })

            }

        />

    </div>

</section>

            </div>

        </div>

    );

}

export default AdminSettings;