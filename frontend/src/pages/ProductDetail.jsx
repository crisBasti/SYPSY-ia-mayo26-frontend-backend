import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp } from "react-icons/fa";
import { slugify } from "../utils/slugify";
import { incrementViewService,
         incrementWhatsappService, 
         reportProductService 
        } from "../services/productService";

function ProductDetail() {

  
  const { id } = useParams();
  
  const realId = id.includes("-")
  ? id.split("-").pop()
  : id;
  
  const viewRegistered = useRef(false);

  const {
    productos,
    fetchProducts
  } = useContext(ProductsContext);

const [showReport, setShowReport] = useState(false);
const [reportReason, setReportReason] = useState("");
const [reportDescription, setReportDescription] = useState("");
const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    if (productos.length === 0) {
      fetchProducts();
    }
  }, []);

 const producto = productos.find(
  (p) => p._id === realId
);

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

const handleWhatsappClick =
  async () => {

    try {

      await incrementWhatsappService(
        producto._id,
        "product"
      );

    } catch (error) {

      console.error(error);

    }

};

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

      <div className="product-detail">

        <img
           src={producto.images?.[0]}
           alt={producto.nombre}
           loading="lazy"
        />

        <h1>{producto.nombre}</h1>

        <p>{producto.descripcion}</p>

        <h2>${producto.precio}</h2>

        <p>
          Categoría: {producto.categoria}
        </p>

        <a
          className="contact-btn"
          onClick={handleWhatsappClick}
          href={`https://wa.me/54${producto.vendedor?.telefono}?text=${encodeURIComponent(
            `Hola ${producto.vendedor?.name} 👋

Estoy interesado en este producto:

📦 ${producto.nombre}

💰 $${producto.precio}

🌐 https://www.sypsy.com.ar/producto/${slugify(producto.nombre)}-${producto._id}`
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp />
          Contactar vendedor
        </a>

        <button
          className="report-btn"
          onClick={() => setShowReport(true)}
        >
          🚩 Reportar publicación
        </button>

      </div>

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