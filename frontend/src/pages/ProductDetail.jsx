import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp } from "react-icons/fa";

function ProductDetail() {

  const { id } = useParams();

  const {
    productos,
    fetchProducts
  } = useContext(ProductsContext);

  useEffect(() => {
    if (productos.length === 0) {
      fetchProducts();
    }
  }, []);

  const producto = productos.find(
    (p) => p._id === id
  );

  const productUrl =
  `https://www.sypsy.com.ar/producto/${producto?._id}`;

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
          href={`https://wa.me/54${producto.vendedor?.telefono}?text=${encodeURIComponent(
            `Hola ${producto.vendedor?.name} 👋

Estoy interesado en este producto:

📦 ${producto.nombre}

💰 $${producto.precio}

🌐 https://www.sypsy.com.ar/producto/${producto._id}`
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp />
          Contactar vendedor
        </a>

      </div>
    </>
  );
}

export default ProductDetail;