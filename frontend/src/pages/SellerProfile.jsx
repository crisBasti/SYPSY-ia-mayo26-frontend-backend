import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

function SellerProfile() {
  const { id } = useParams();
  const { productos } = useContext(ProductsContext);

  // 🔥 productos del vendedor por UID
  const sellerProducts = productos.filter(
  (p) => p.vendedor?.uid === id
);

const seller = sellerProducts[0]?.vendedor;

  // 🔥 si no hay productos
  if (sellerProducts.length === 0) {
    return (
      <div className="seller-profile">
        <h2>No hay productos para este vendedor</h2>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  return (
    <div className="seller-profile">

      {/* HEADER */}
      <div className="seller-header">

<h1>
👤 {seller?.name || "Vendedor SYPSY"}
</h1>


<div className="seller-badge">
⭐ Vendedor SYPSY
</div>


<div className="seller-stats">


<div>
<strong>
{sellerProducts.length}
</strong>
<span>
Productos publicados
</span>
</div>


<div>
<strong>
{
[...new Set(
sellerProducts.map(
p=>p.categoria
)
)].length
}
</strong>
<span>
Categorías
</span>
</div>


<div>
<strong>
100%
</strong>
<span>
Perfil activo
</span>
</div>


</div>


</div>

      {/* PRODUCTOS */}

<h2>
Productos publicados
</h2>

<div className="products-grid">

{
sellerProducts.length > 0 ?

sellerProducts.map(product => (

<ProductCard
 key={product._id}
 product={product}
/>

))

:

<div className="empty-category">

<h2>
Todavía no tiene publicaciones
</h2>

<p>
Este vendedor aún no publicó productos.
</p>

</div>

}

</div>

    </div>
  );
}

export default SellerProfile;