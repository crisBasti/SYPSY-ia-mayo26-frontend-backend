import { useEffect, useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import OrderCard from "../components/admin/OrderCard";
import OrderDrawer from "../components/admin/OrderDrawer";

function AdminOrders() {

    const [pedidos, setPedidos] = useState([]);

    const [busqueda, setBusqueda] = useState("");

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    const actualizarPedido = (pedidoActualizado) => {

    setPedidos((prev) =>

        prev.map((pedido) =>

            pedido._id === pedidoActualizado._id
                ? pedidoActualizado
                : pedido
        )

    );

    setPedidoSeleccionado(pedidoActualizado);

};

    const resumen = {

    pendientes:

        pedidos.filter(

            p => p.estado === "pendiente"

        ).length,

    aceptados:

        pedidos.filter(

            p => p.estado === "aceptado"

        ).length,

    pagados:

        pedidos.filter(

            p => p.estado === "pagado"

        ).length,

    entregados:

        pedidos.filter(

            p => p.estado === "entregado"

        ).length,

    cancelados:

        pedidos.filter(

            p => p.estado === "cancelado"

        ).length

};


const pedidosUrgentes = pedidos.filter(p=>{

    if(p.estado==="finalizado") return false;

    const horas=(Date.now()-new Date(p.createdAt))/3600000;

    return horas>=24;

});


const ordenarPedidos = (lista) => {

    return [...lista].sort((a, b) => {

        const fechaA = new Date(a.createdAt).getTime();
        const fechaB = new Date(b.createdAt).getTime();

        // Más antiguos primero
        if (fechaA !== fechaB) {

            return fechaA - fechaB;

        }

        // Si tienen la misma fecha, mayor importe primero
        if (a.total !== b.total) {

            return b.total - a.total;

        }

        // Último criterio: número de pedido
        return a.numeroPedido.localeCompare(b.numeroPedido);

    });

};


const pedidosFiltrados = pedidos.filter((pedido) => {

    const producto =
        pedido.producto?.nombre?.toLowerCase() || "";

    const vendedor =
        pedido.vendedor?.name?.toLowerCase() || "";

    const texto =
        busqueda.toLowerCase();

    return (

        producto.includes(texto) ||

        vendedor.includes(texto)

    );

});


const pedidosPendientes =
    pedidosFiltrados.filter(
        pedido => pedido.estado === "pendiente"
    );

const pedidosAceptados =
    pedidosFiltrados.filter(
        pedido => pedido.estado === "aceptado"
    );

const pedidosPreparando =
    pedidosFiltrados.filter(
        pedido => pedido.estado === "preparando"
    );

const pedidosEnviados =
    pedidosFiltrados.filter(
        pedido => pedido.estado === "enviado"
    );

const pedidosEntregados =
    pedidosFiltrados.filter(
        pedido => pedido.estado === "entregado"
    );

const pedidosFinalizados =
    pedidosFiltrados.filter(
        pedido => pedido.estado === "finalizado"
    );



    useEffect(() => {

        cargarPedidos();

    }, []);

    const cargarPedidos = async () => {

        try {

            const token =
                await auth.currentUser.getIdToken();

            const response = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/orders`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setPedidos(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div>
            <>

            <h2>📦 Pedidos</h2>

            <div className="orders-toolbar">

                <input

                  type="text"

                  placeholder="🔍 Buscar producto o vendedor..."

                  value={busqueda}

                  onChange={(e)=>

                  setBusqueda(e.target.value)

                  }

                />

            </div>

            <div className="orders-summary">

              <div className="summary-card">

                  <h3>🟡 Pendientes</h3>

                  <span>{resumen.pendientes}</span>

              </div>

              <div className="summary-card">

                  <h3>🟢 Aceptados</h3>

                  <span>{resumen.aceptados}</span>

              </div>

              <div className="summary-card">

                  <h3>💳 Pagados</h3>

                  <span>{resumen.pagados}</span>

              </div>

              <div className="summary-card">

                  <h3>📦 Entregados</h3>

                  <span>{resumen.entregados}</span>

              </div>

              <div className="summary-card">

                  <h3>❌ Cancelados</h3>

                  <span>{resumen.cancelados}</span>

              </div>

            </div>


            {pedidosUrgentes.length > 0 && (

              <div className="urgent-alert">

                🚨 Hay <strong>{pedidosUrgentes.length}</strong> pedidos con más de 24 horas sin resolver.

              </div>

            )}




    <div className="kanban-board">

    <div className="kanban-column">

    <h3>

          🟡 Pendientes

        ({pedidosPendientes.length})

      <small>

        $

        {pedidosPendientes
          .reduce((t,p)=>t+p.total,0)
          .toLocaleString()}

      </small>

    </h3>

    {

        ordenarPedidos(pedidosPendientes).map((pedido)=>(

            <OrderCard

                key={pedido._id}

                pedido={pedido}

                onSelect={setPedidoSeleccionado}

            />

        ))

    }

    </div>

                    <div className="kanban-column">

                    <h3>

🟢 Aceptados

({pedidosAceptados.length})

<small>

$

{pedidosAceptados
.reduce((t,p)=>t+p.total,0)
.toLocaleString()}

</small>

</h3>

                    {

                    ordenarPedidos(pedidosAceptados).map((pedido)=>(

                    <OrderCard

                        key={pedido._id}

                        pedido={pedido}

                        onSelect={setPedidoSeleccionado}

                        />

                      ))

                    }

                    </div>

                    <div className="kanban-column">

    <h3>

📦 Preparando

({pedidosPreparando.length})

<small>

$

{pedidosPreparando
.reduce((t,p)=>t+p.total,0)
.toLocaleString()}

</small>

</h3>

    {

        ordenarPedidos(pedidosPreparando).map((pedido)=>(

            <OrderCard

                key={pedido._id}

                pedido={pedido}

                onSelect={setPedidoSeleccionado}
                

            />

        ))

    }

</div>

                    <div className="kanban-column">

    <h3>

🚚 Enviados

({pedidosEnviados.length})

<small>

$

{pedidosEnviados
.reduce((t,p)=>t+p.total,0)
.toLocaleString()}

</small>

</h3>

    {

        ordenarPedidos(pedidosEnviados).map((pedido)=>(

            <OrderCard

                key={pedido._id}

                pedido={pedido}

                onSelect={setPedidoSeleccionado}

            />

        ))

    }

</div>

                <div className="kanban-column">

    <h3>

📬 Entregados

({pedidosEntregados.length})

<small>

$

{pedidosEntregados
.reduce((t,p)=>t+p.total,0)
.toLocaleString()}

</small>

</h3>

    {

        ordenarPedidos(pedidosEntregados).map((pedido)=>(

            <OrderCard

                key={pedido._id}

                pedido={pedido}

                onSelect={setPedidoSeleccionado}

            />

        ))

    }

</div>

                <div className="kanban-column">

                    <h3>

✅ Finalizados

({pedidosFinalizados.length})

<small>

$

{pedidosFinalizados
.reduce((t,p)=>t+p.total,0)
.toLocaleString()}

</small>

</h3>

                    {

                      ordenarPedidos(pedidosFinalizados).map((pedido)=>(

                        <OrderCard

                          key={pedido._id}

                          pedido={pedido}

                          onSelect={setPedidoSeleccionado}

                        />
                      ))

                    }

                    

                </div>

            </div>

                    <OrderDrawer
                      pedido={pedidoSeleccionado}
                      onClose={() => setPedidoSeleccionado(null)}
                      onActualizarPedido={actualizarPedido}
                    />
            </>        

        </div>
    );

}

export default AdminOrders;