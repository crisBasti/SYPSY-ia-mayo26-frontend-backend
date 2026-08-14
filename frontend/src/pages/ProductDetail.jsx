import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { Helmet } from "react-helmet-async";
import { slugify } from "../utils/slugify";
import { incrementViewService, 
         reportProductService 
        } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { crearPedidoService } from "../services/orderService";
import { auth } from "../firebase";

function ProductDetail() {

  
  const { id } = useParams();

  const navigate = useNavigate();
  
  const realId = id.includes("-")
  ? id.split("-").pop()
  : id;
  
  const viewRegistered = useRef(false);

  const {
    productos,
    fetchProducts
  } = useContext(ProductsContext);

  const { user } = useAuth();

const [showReport, setShowReport] = useState(false);
const [reportReason, setReportReason] = useState("");
const [reportDescription, setReportDescription] = useState("");
const [reportLoading, setReportLoading] = useState(false);
const [imagenActual,setImagenActual]=useState(0);
const [showConfirmBuy, setShowConfirmBuy] = useState(false);

const producto = productos.find(
  (p) => p._id === realId
);

const productosSimilares =

producto

? productos
    .filter(
      (p) =>
        p.categoria === producto.categoria &&
        p._id !== producto._id
    )
    .slice(0,4)

: [];


  useEffect(() => {
    if (productos.length === 0) {
      fetchProducts();
    }
  }, []);

 

useEffect(() => {

  if (!producto) return;

  if (viewRegistered.current) return;

  viewRegistered.current = true;

  incrementViewService(
    producto._id,
    "product"
  ).catch(console.error);

}, [producto]);


  const productUrl = producto
  ? `https://www.sypsy.com.ar/producto/${slugify(
      producto.nombre
    )}-${producto._id}`
  : "";

const productImage =
  producto?.images?.[0] ||
  "https://www.sypsy.com.ar/logo.png";

const schemaData = producto
  ? {
      "@context": "https://schema.org",
      "@type": "Product",
      name: producto.nombre,
      description: producto.descripcion,
      image: productImage,
      category: producto.categoria,
      offers: {
        "@type": "Offer",
        price: producto.precio,
        priceCurrency: "ARS",
        availability:
          "https://schema.org/InStock"
      }
    }
  : null;

  if (
  productos.length === 0
) {
  return <h2>Cargando...</h2>;
}

if (!producto) {
  return (
    <h2>
      Producto no encontrado
    </h2>
  );
}

const handleReportSubmit = async () => {

  if (!reportReason) {
    alert("Seleccioná un motivo");
    return;
  }

  try {

    setReportLoading(true);

    await reportProductService(
      producto._id,
      reportReason,
      reportDescription
    );

    alert("Reporte enviado correctamente");

    setShowReport(false);
    setReportReason("");
    setReportDescription("");

  } catch (error) {

    console.error(error);
    alert("Error al enviar reporte");

  } finally {

    setReportLoading(false);

  }

};


const handleComprar = async () => {

    if (user?.uid === producto.vendedor?.uid) {

        alert(
            "No puedes comprar tus propios productos."
        );

        return;

    }

    try {

        const token =
            await auth.currentUser.getIdToken();

        const pedido = {

            vendedor: producto.vendedor,

            producto: producto._id,

            precio: producto.precio,

            cantidad: 1,

            costoEnvio: 0

        };

        const resultado =
            await crearPedidoService(
                pedido,
                token
            );

        setShowConfirmBuy(false);

        navigate(
            `/pagar-pedido/${resultado._id}`
        );

    } catch (error) {

        console.error(
            "Error creando pedido:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Error creando pedido"
        );

    }

};


  return (
    <>
      <Helmet>

  <title>
    {producto.nombre} | SYPSY
  </title>

  <meta
    name="description"
    content={producto.descripcion}
  />

  <meta
    name="keywords"
    content={`${producto.nombre}, ${producto.categoria}, comprar online, marketplace argentina`}
  />

  <link
    rel="canonical"
    href={productUrl}
  />

  {/* Open Graph */}

  <meta
    property="og:title"
    content={producto.nombre}
  />

  <meta
    property="og:description"
    content={producto.descripcion}
  />

  <meta
    property="og:image"
    content={productImage}
  />

  <meta
    property="og:url"
    content={productUrl}
  />

  <meta
    property="og:type"
    content="product"
  />

  {/* Twitter */}

  <meta
    name="twitter:card"
    content="summary_large_image"
  />

  <meta
    name="twitter:title"
    content={producto.nombre}
  />

  <meta
    name="twitter:description"
    content={producto.descripcion}
  />

  <meta
    name="twitter:image"
    content={productImage}
  />

  {/* Schema.org */}

  <script type="application/ld+json">
    {JSON.stringify(schemaData)}
  </script>

</Helmet>


{showConfirmBuy && (

    <div className="confirm-buy-overlay">

        <div
            className="confirm-buy-box"
            onClick={(e) =>
                e.stopPropagation()
            }
        >

            <h2>
                🛒 Confirmar compra
            </h2>

            <p>
                Estás por comprar:
            </p>

            <h3>
                {producto.nombre}
            </h3>

            <p>
                Precio:
                {" "}
                <strong>
                    ${producto.precio}
                </strong>
            </p>

            <p>

                Si confirmás,
                se creará el pedido y
                serás redirigido al pago.

            </p>

            <small>

                🔒 Tus datos personales permanecerán
                protegidos y el pedido quedará pendiente
                hasta verificar el pago.

            </small>


            <div className="confirm-actions">

                <button

                    className="cancel-btn"

                    onClick={() =>
                        setShowConfirmBuy(false)
                    }

                >

                    Cancelar

                </button>


                <button

                    className="buy-btn"

                    onClick={handleComprar}

                >

                    💳 Confirmar y pagar

                </button>

            </div>

        </div>

    </div>

)}



      <div className="product-detail">

        <div className="detail-gallery">

<img
src={
producto.images?.[imagenActual]
}
alt={producto.nombre}
/>


{
producto.images?.length > 1 && (

<div className="gallery-buttons">

<button
onClick={()=>setImagenActual(
imagenActual===0
?
producto.images.length-1
:
imagenActual-1
)}
>
‹
</button>


<button
onClick={()=>setImagenActual(
imagenActual===producto.images.length-1
?
0
:
imagenActual+1
)}
>
›
</button>

</div>

)

}

</div>

        <h1>{producto.nombre}</h1>

        <p>{producto.descripcion}</p>

        <h2>${producto.precio}</h2>

        <p>
          Categoría: {producto.categoria}
        </p>

        <div className="seller-product-box">

<h3>
🏪 Vendedor
</h3>

<p>
{producto.vendedor?.name}
</p>

<Link

to={`/seller/${producto.vendedor?.uid}`}

className="seller-profile-btn"

>
👤 Ver perfil del vendedor
</Link>

</div>

        {user?.uid !== producto.vendedor?.uid ? (

<button
    className="buy-sypsy-btn"
    onClick={() =>
        setShowConfirmBuy(true)
    }
>

    🛒 Comprar ahora

</button>

) : (

<button
className="buy-sypsy-btn"
disabled
style={{
background:"#9ca3af",
cursor:"not-allowed"
}}
>

📦 Es tu publicación

</button>

)}


        <button
          className="report-btn"
          onClick={() => setShowReport(true)}
        >
          🚩 Reportar publicación
        </button>

        <div className="sypsy-trust-box">

            <h3>
                🛡️ Compra segura en SYPSY
            </h3>

            <p>
                Publicaciones revisadas por nuestra comunidad.
                Si encontrás algo irregular podés reportarlo.
            </p>

        </div>

      </div>

      {

productosSimilares.length > 0 && (

<section className="similar-products">

<h2>
También te puede interesar
</h2>


<div className="products-grid">

{
productosSimilares.map((item)=>(

<ProductCard

key={item._id}

product={item}

/>

))

}

</div>


</section>

)

}

      {showReport && (
  <div className="report-modal">

    <div className="report-box">

      <h3>Reportar publicación</h3>

      <select
        value={reportReason}
        onChange={(e) => setReportReason(e.target.value)}
      >
        <option value="">Seleccionar motivo</option>
        <option value="Estafa">Estafa</option>
        <option value="Spam">Spam</option>
        <option value="Contenido ofensivo">Contenido ofensivo</option>
        <option value="Producto falso">Producto falso</option>
        <option value="Otro">Otro</option>
      </select>

      <textarea
        placeholder="Descripción (opcional)"
        value={reportDescription}
        onChange={(e) =>
          setReportDescription(e.target.value)
        }
      />

      <div className="report-actions">

        <button
          onClick={handleReportSubmit}
          disabled={reportLoading}
        >
          {reportLoading
            ? "Enviando..."
            : "Enviar"}
        </button>

        <button
          onClick={() => setShowReport(false)}
        >
          Cancelar
        </button>

      </div>

    </div>

  </div>
)}
    </>
  );
}

export default ProductDetail;