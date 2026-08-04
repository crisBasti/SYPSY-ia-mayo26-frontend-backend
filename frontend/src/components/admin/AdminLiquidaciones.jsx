import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../firebase";

function AdminLiquidaciones() {

    const [pagos, setPagos] = useState([]);

    const [comprobante,setComprobante] = useState(null);

    const subirTransferencia = async(id)=>{

    if(!comprobante){

        alert("Selecciona el comprobante.");

        return;

    }

    const token =
        await auth.currentUser.getIdToken();

    const form = new FormData();

    form.append(
        "comprobante",
        comprobante
    );

    await axios.post(

        `${import.meta.env.VITE_API_URL}/api/orders/${id}/transfer-proof`,

        form,

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    alert("Transferencia registrada.");

    cargarPagosPendientes();

};

    useEffect(() => {

        cargarPagos();

    }, []);

    const cargarPagos = async () => {

        try {

            const token = await auth.currentUser.getIdToken();

            const { data } = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/orders/admin/pagos-pendientes`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setPagos(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="admin-liquidaciones">

            <h2>💸 Liquidaciones a Vendedores</h2>

            {
                pagos.length === 0 && (

                    <p>No hay pagos pendientes.</p>

                )
            }

            {
                pagos.map((pedido) => (

                    <div
                        key={pedido._id}
                        className="finance-card"
                    >

                        <h3>{pedido.numeroPedido}</h3>

                        <p>
                            📦 {pedido.producto?.nombre}
                        </p>

                        <p>
                            👤 {pedido.vendedor?.name}
                        </p>

                        <p>
                            💰 ${pedido.total}
                        </p>

                        <hr />

                        <p>
                            Titular:
                            {" "}
                            {pedido.datosBancarios?.titular}
                        </p>

                        <p>
                            Banco:
                            {" "}
                            {pedido.datosBancarios?.banco}
                        </p>

                        <p>
                            Alias:
                            {" "}
                            {pedido.datosBancarios?.alias}
                        </p>

                        <p>
                            CVU:
                            {" "}
                            {pedido.datosBancarios?.cvu}
                        </p>

                        <input
                          type="file"
                          onChange={(e)=>setComprobante(e.target.files[0])}
                        />

                        <button
                          onClick={()=>subirTransferencia(pedido._id)}
                        >
                           💸 Confirmar transferencia
                        </button>

                    </div>

                ))
            }

        </div>

    );

}

export default AdminLiquidaciones;