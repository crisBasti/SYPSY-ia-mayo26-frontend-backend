import { useEffect, useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import OrderCard from "../components/admin/OrderCard";
import OrderDrawer from "../components/admin/OrderDrawer";

function AdminOrders() {

    const [pedidos, setPedidos] = useState([]);

    const [busqueda, setBusqueda] = useState("");

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

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

const pedidosPagados =
    pedidosFiltrados.filter(
        pedido => pedido.estado === "pagado"
    );

const pedidosEnReparto =
    pedidosFiltrados.filter(
        pedido => pedido.estado === "en_reparto"
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

    <div className="kanban-board">

    <div className="kanban-column">

    <h3>

        🟡 Pendientes

        ({pedidosPendientes.length})

    </h3>

    {

        pedidosPendientes.map((pedido)=>(

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

                    </h3>

                    {

                    pedidosAceptados.map((pedido)=>(

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

                    💳 Pagados

                    ({pedidosPagados.length})

                    </h3>

                    {

                       pedidosPagados.map((pedido)=>(

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

                      🚚 En reparto

                      ({pedidosEnReparto.length})

                    </h3>

                    {

                      pedidosEnReparto.map((pedido)=>(

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

                    </h3>

                    {

                      pedidosFinalizados.map((pedido)=>(

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

                    />
            </>        

        </div>
    );

}

export default AdminOrders;