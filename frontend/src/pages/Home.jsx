import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdvertisementCarousel from "../components/AdvertisementCarousel";
import { getAdvertisementsService } from "../services/advertisementService";
import { useAuth } from "../context/AuthContext";
import { registrarImpresion, registrarClick } from "../services/promotionService";
import { crearPedidoService } from "../services/orderService";
import { auth } from "../firebase";
import { useLocation } from "../context/LocationContext";
import calcularDistancia from "../utils/calcularDistancia";
import ProductCard from "../components/ProductCard";

/*
import SellerBadge from "../components/SellerBadge";
import TrustBadges from "../components/TrustBadges";
import { slugify } from "../utils/slugify";
import getOpportunityBadge from "../utils/getOpportunityBadge";
import getSmartBadges from "../utils/getSmartBadges";
import getPersuasionBadges from "../utils/persuasionEngine"; 
*/


function Home({ search }) {
  const { productos, fetchProducts } = useContext(ProductsContext);

  const { user } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();
  
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


/* const [selectedProduct, setSelectedProduct] = useState(null);
const [imgIndex, setImgIndex] = useState({}); */

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [showConfirmBuy, setShowConfirmBuy] = useState(false);
  const [productToBuy, setProductToBuy] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);


const handleComprar = async (product) => {

    if (user?.uid === product.vendedor?.uid) {

        alert(
            "No puedes comprar tus propios productos."
        );

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

        setShowConfirmBuy(false);
        setProductToBuy(null);

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

/*
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

*/

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
  const filteredProducts = productos.filter((product) => {

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

    // 1) Promociones primero
    if ((a.nivelPromocion || 0) !== (b.nivelPromocion || 0)) {

        return (b.nivelPromocion || 0) - (a.nivelPromocion || 0);

    }

    // 2) Luego ordenar por cercanía
    const distanciaA = calcularDistancia(

        location?.lat,
        location?.lng,
        a?.ubicacion?.lat,
        a?.ubicacion?.lng

    );

    const distanciaB = calcularDistancia(

        location?.lat,
        location?.lng,
        b?.ubicacion?.lat,
        b?.ubicacion?.lng

    );

    if (distanciaA && distanciaB) {

        return distanciaA - distanciaB;

    }

    // 3) Si ninguno tiene ubicación, mostrar primero los más nuevos
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

      {/* =========================
    GRID DE PRODUCTOS
========================= */}

<div className="products-grid">

  {filteredProducts.map((product) => (

    <ProductCard
      key={product._id}
      product={product}
      onImpression={registrarImpresion}
      onClick={() => registrarClick(product._id)}
    />

  ))}

</div>

      <AdvertisementCarousel

        position="home_bottom"

        advertisements={advertisements}

      />

      {showConfirmBuy && productToBuy && (

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
              onClick={() =>
                handleComprar(productToBuy)
              }

            >

              💳 Confirmar y pagar

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