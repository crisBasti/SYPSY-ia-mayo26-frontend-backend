import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import SellerBadge from "../components/SellerBadge";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { slugify } from "../utils/slugify";
import AdvertisementCarousel from "../components/AdvertisementCarousel";
import { getAdvertisementsService } from "../services/advertisementService";
import { useAuth } from "../context/AuthContext";



import { crearPedidoService } from "../services/orderService";
import { auth } from "../firebase";

function Home({ search }) {
  const { productos, fetchProducts } = useContext(ProductsContext);

  const { user } = useAuth();
  
useEffect(() => {

    const loadData = async () => {

        await fetchProducts();

        try {

            const ads = await getAdvertisementsService();

            setAdvertisements(ads);

        } catch (error) {

            console.error(error);

        }

    };

    loadData();

}, []);

  

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmBuy, setShowConfirmBuy] = useState(false);
  const [productToBuy, setProductToBuy] = useState(null);
  const [imgIndex, setImgIndex] = useState({});
  const [advertisements, setAdvertisements] = useState([]);

const handleComprar = async (product) => {

  if(user?.uid === product.vendedor?.uid){

    alert("No puedes comprar tus propios productos.");

    return;

}

  try {

    const token =
      await auth.currentUser.getIdToken();


    const pedido = {

      vendedor: product.vendedor,

      producto: product._id,

      precio: product.precio,

      cantidad: 1,

      costoEnvio: 0

    };


    const resultado =
      await crearPedidoService(
        pedido,
        token
      );


    console.log(
      "PEDIDO CREADO:",
      resultado
    );


    alert(
      "Pedido creado correctamente"
    );


  } catch (error) {

    console.error(
      "Error creando pedido:",
      error
    );


    alert(
      "Error creando pedido"
    );

  }

};

  const nextImage = (productId, total) => {
  setImgIndex((prev) => ({
    ...prev,
    [productId]:
      ((prev[productId] || 0) + 1) % total
  }));
};

const prevImage = (productId, total) => {
  setImgIndex((prev) => ({
    ...prev,
    [productId]:
      ((prev[productId] || 0) - 1 + total) % total
  }));
};

  // =========================
  // CATEGORÍAS
  // =========================
  const categorias = [
    "Todos",
    ...new Set(productos.map((p) => p.categoria))
  ];

  // =========================
  // FILTRO
  // =========================
  const filteredProducts = productos

.filter((product) => {

    const textoBusqueda = search.toLowerCase();

    return (

        product.nombre.toLowerCase().includes(textoBusqueda) ||

        product.descripcion.toLowerCase().includes(textoBusqueda) ||

        product.categoria.toLowerCase().includes(textoBusqueda)

    ) && (

        categoriaActiva === "Todos" ||

        product.categoria === categoriaActiva

    );

})

.sort((a, b) => {

    // Prioridad por nivel de promoción
    if ((a.nivelPromocion || 0) !== (b.nivelPromocion || 0)) {

        return (b.nivelPromocion || 0) - (a.nivelPromocion || 0);

    }

    // Si tienen el mismo nivel, mostrar primero los más nuevos
    return new Date(b.createdAt) - new Date(a.createdAt);

});


    return (
  <>
    <Helmet>

      <title>
        SYPSY | Marketplace de productos y servicios en Argentina
      </title>

      <meta
        name="description"
        content="Comprá y vendé productos, servicios y oportunidades en SYPSY. Marketplace argentino con vendedores verificados y contacto directo por WhatsApp."
      />

      <meta
        name="keywords"
        content="marketplace, ecommerce, argentina, comprar, vender, productos, servicios, whatsapp, sypsy"
      />

      <meta
        property="og:title"
        content="SYPSY | Marketplace de productos y servicios"
      />

      <meta
        property="og:description"
        content="Comprá y vendé productos y servicios con contacto directo por WhatsApp."
      />

      <meta
        property="og:url"
        content="https://www.sypsy.com.ar"
      />

      <meta
        property="og:type"
        content="website"
      />

    </Helmet>

    <div className="advertisement-container">

      <AdvertisementCarousel
        position="home_top"
        advertisements={advertisements}
      />

      <AdvertisementCarousel

        position="home_middle"

        advertisements={advertisements}

      />

      {/* GRID */}
      <div className="products-grid">

        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">

          {product.promocionado && (

            <div className="promotion-badge">

              {product.nivelPromocion === 3
                ? "👑 PREMIUM"
                : product.nivelPromocion === 2
                ? "🚀 DESTACADO"
                : "⭐ PROMOCIONADO"}

            </div>

           )}

            {/* IMAGEN */}
            <div className="card-image">

  {/* FLECHA IZQUIERDA */}
  {product.images?.length > 1 && (
    <button
      className="carousel-btn left"
      onClick={() =>
        prevImage(
          product._id,
          product.images.length
        )
      }
    >
      ◀
    </button>
  )}

  {/* IMAGEN */}
  <img
    src={
      product.images?.[
        imgIndex[product._id] || 0
      ]
    }
    alt={product.nombre}
  />

  {/* FLECHA DERECHA */}
  {product.images?.length > 1 && (
    <button
      className="carousel-btn right"
      onClick={() =>
        nextImage(
          product._id,
          product.images.length
        )
      }
    >
      ▶
    </button>
  )}

</div>

<span className="seller-name">
  👤 {
    product.vendedor?.name ||
    product.vendedor?.email?.split("@")[0] ||
    "Usuario"
  }
</span>

<span className="seller-rating">
  ⭐ Vendedor activo
</span>

            {/* INFO */}
            <div className="product-info">

              {/* 🔥 SELLER LINK CORRECTO */}
              <SellerBadge vendedor={product.vendedor} />

              <span className="category-badge">
                {product.categoria}
              </span>

              {product.promocionado && (

                <div className="promotion-badge">

                  🚀 DESTACADO

                </div>

              )}


              {product.nivelPromocion === 3 && (

                <div className="premium-badge">

                  👑 PREMIUM

                </div>

              )}

              <h3>{product.nombre}</h3>

              <p>{product.descripcion}</p>

              <span className="price">
                ${product.precio}
              </span>

              <div className="product-status">

          <span className="status-dot"></span>

             Disponible

        </div>


              {/* VER PRODUCTO */}
              <Link
                to={`/producto/${slugify(product.nombre)}-${product._id}`}
                className="view-btn"
              >
              Ver producto
              </Link>

              {user?.uid !== product.vendedor?.uid ? (

                <button
                  className="buy-btn"
                  onClick={() => {
                    setProductToBuy(product);
                    setShowConfirmBuy(true);
                  }}
                >
                  🛒 Comprar ahora
                </button>

              ) : (

                <button
                  className="buy-btn"
                  disabled
                   style={{
                    background:"#9ca3af",
                      cursor:"not-allowed"
                  }}
                >
                  📦 Es tu publicación
                </button>

              )}

            </div>
          </div>
        ))}
      </div>

      <AdvertisementCarousel

        position="home_bottom"

        advertisements={advertisements}

      />

      {/* MODAL */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-carousel">

  {selectedProduct.images?.length > 1 && (
    <button
      className="carousel-btn left"
      onClick={() =>
        prevImage(
          "modal",
          selectedProduct.images.length
        )
      }
    >
      ◀
    </button>
  )}

  <img
    src={
      selectedProduct.images?.[
        imgIndex["modal"] || 0
      ]
    }
    alt={selectedProduct.nombre}
  />

  {selectedProduct.images?.length > 1 && (
    <button
      className="carousel-btn right"
      onClick={() =>
        nextImage(
          "modal",
          selectedProduct.images.length
        )
      }
    >
      ▶
    </button>
  )}

</div>

            <h2>{selectedProduct.nombre}</h2>
            <p>{selectedProduct.descripcion}</p>
            <span>${selectedProduct.precio}</span>
          </div>
        </div>
      )}


      {
showConfirmBuy && productToBuy && (

<div className="confirm-buy-overlay">

    <div className="confirm-buy-box">

        <h2>
            🛒 Confirmar compra
        </h2>

        <p>

            Estás por comprar:

        </p>

        <h3>

            {productToBuy.nombre}

        </h3>

        <p>

            Precio:

            <strong>

                ${productToBuy.precio}

            </strong>

        </p>

        <p>

            Si confirmás,

            se creará el pedido y el vendedor será notificado.

        </p>

        <small>

            🔒 Tus datos personales permanecerán ocultos hasta que SYPSY valide el pago.

        </small>

        <div className="confirm-actions">

            <button

                className="cancel-btn"

                onClick={()=>{

                    setShowConfirmBuy(false);

                    setProductToBuy(null);

                }}

            >

                Cancelar

            </button>

            <button

                className="buy-btn"

                onClick={async()=>{

                    await handleComprar(productToBuy);

                    setShowConfirmBuy(false);

                    setProductToBuy(null);

                }}

            >

                Confirmar compra

            </button>

        </div>

    </div>

</div>

)
}

      

    </div>
    </>
  );
}

export default Home;