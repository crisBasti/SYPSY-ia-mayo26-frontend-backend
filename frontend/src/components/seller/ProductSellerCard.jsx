
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";



function ProductSellerCard({ 
    producto,

    onDelete }) {

    const navigate = useNavigate();

    const eliminarProducto = async () => {

    const confirmar = window.confirm(

        "¿Eliminar este producto?"

    );

    if (!confirmar) return;

    try {

        const token =
            await auth.currentUser.getIdToken();

        await axios.delete(

            `${import.meta.env.VITE_API_URL}/api/products/${producto._id}`,

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        onDelete(producto._id);

    }

    catch(error){

        console.error(error);

        alert("No se pudo eliminar.");

    }

};


const cambiarEstado = async () => {
  try {
    const token = await auth.currentUser.getIdToken();

    const endpoint =
      producto.estado === "activo"
        ? "pause"
        : "reactivate";

    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/products/${producto._id}/${endpoint}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload(); // después lo optimizamos

  } catch (error) {
    console.error(error);
    alert("Error cambiando estado");
  }
};

    

    return (

        <div className="seller-product-card">

            <img
                src={producto.images?.[0]}
                alt={producto.nombre}
                className="seller-product-image"
            />

            <div className="seller-product-info">

                <h3>{producto.nombre}</h3>

                <p><strong>💲</strong> ${producto.precio.toLocaleString()}</p>

                <p><strong>📦 Stock:</strong> {producto.stock}</p>

                <p><strong>👁 Vistas:</strong> {producto.views || 0}</p>

                <p><strong>💬 WhatsApp:</strong> {producto.whatsappClicks || 0}</p>

                <p>

                    <strong>Estado:</strong>

                    <p>
                        <strong>Estado:</strong>{" "}
                          {producto.estado === "activo" ? (
                        <span className="status-active">🟢 Activo</span>
                      ) : (
                        <span className="status-paused">🟡 Pausado</span>
                      )}
                    </p>

                </p>

            </div>

            <div className="seller-product-actions">

                <button
                   onClick={() =>
                   navigate(`/micuenta/producto/${producto._id}`)
                }
                   >
                    ✏ Editar
                </button>

                <button
                   onClick={() =>
                      navigate(`/micuenta/producto/${producto._id}?tab=stats`)
                  }
                >
                  📊 Estadísticas
                </button>

                <button onClick={cambiarEstado}>
                  {producto.estado === "activo"
                  ? "⏸ Pausar"
                  : "▶ Reactivar"}
                </button>

                <button
                   onClick={eliminarProducto}
                >
                   🗑 Eliminar
                </button>

            </div>

        </div>

    );

}

export default ProductSellerCard;