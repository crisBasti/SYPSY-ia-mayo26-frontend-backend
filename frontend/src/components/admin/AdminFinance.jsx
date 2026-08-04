import { useEffect, useState } from "react";
import { auth } from "../../firebase";

import {

    obtenerResumenFinanciero

} from "../../services/financeService";

function AdminFinance() {

    const [resumen, setResumen] = useState({

    totalPedidos: 0,

    facturacionTotal: 0,

    comisionTotal: 0,

    dineroRetenido: 0,

    dineroLiberado: 0,

    pendienteLiquidar: 0,

    promocionesActivas: 0,

    promocionesCobradas: 0,

    ingresosPromociones: 0

});

    useEffect(() => {

        cargarResumen();

    }, []);

    const cargarResumen = async () => {

        try {

            const token =
                await auth.currentUser.getIdToken();

            const datos =
                await obtenerResumenFinanciero(token);

            setResumen(datos);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="finance-container">

            <h2>💰 Centro Financiero</h2>

            <div className="finance-grid">

                <div className="finance-card">

                    <h3>💵 Comisión Generada</h3>

                    <span>

                        $

                        {resumen.comisionTotal.toLocaleString()}

                    </span>

                </div>

                <div className="finance-card">

                    <h3>📦 Pedidos</h3>

                    <span>

                        {resumen.totalPedidos}

                    </span>

                </div>

                <div className="finance-card">

                    <h3>💳 Dinero Retenido</h3>

                    <span>

                        $

                        {resumen.dineroRetenido.toLocaleString()}

                    </span>

                </div>

                <div className="finance-card">

                    <h3>🏦 Dinero Liberado</h3>

                    <span>

                        $

                        {resumen.dineroLiberado.toLocaleString()}

                    </span>

                </div>

                <div className="finance-card">

    <h3>💰 Facturación Total</h3>

    <span>

        $

        {resumen.facturacionTotal.toLocaleString()}

    </span>

</div>

<div className="finance-card">

    <h3>📢 Ingresos Promociones</h3>

    <span>

        $

        {resumen.ingresosPromociones.toLocaleString()}

    </span>

</div>

<div className="finance-card">

    <h3>🚀 Promociones Activas</h3>

    <span>

        {resumen.promocionesActivas}

    </span>

</div>

<div className="finance-card">

    <h3>✅ Promociones Cobradas</h3>

    <span>

        {resumen.promocionesCobradas}

    </span>

</div>

                <div className="finance-card">

                    <h3>⏳ Pendiente de Liquidar</h3>

                    <span>

                        $

                        {resumen.pendienteLiquidar.toLocaleString()}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default AdminFinance;