import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import axios from "axios";

function SellerProfile() {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const { productos } = useContext(ProductsContext);

  useEffect(() => {

    const cargarPerfil = async () => {

        try {

            const { data } = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/profile/${id}`

            );

            setPerfil(data);

        }

        catch(error){

            console.error(error);

        }

    };

    cargarPerfil();

}, [id]);

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
👤 {perfil?.name || seller?.name || "Vendedor SYPSY"}
</h1>


<div className="seller-badge">
⭐ Vendedor SYPSY
</div>

<p>

📍 {perfil?.direccion?.ciudad || ""}

{perfil?.direccion?.provincia
    ? `, ${perfil.direccion.provincia}`
    : ""}

</p>


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


{

perfil?.descripcion && (

<div className="seller-description">

<h3>

Sobre el vendedor

</h3>

<p>

{perfil.descripcion}

</p>

</div>

)

}


<div className="seller-contact">

{

perfil?.whatsapp &&

<p>

📱 {perfil.whatsapp}

</p>

}

{

perfil?.instagram &&

<p>

📸 {perfil.instagram}

</p>

}

{

perfil?.facebook &&

<p>

📘 {perfil.facebook}

</p>

}

{

perfil?.sitioWeb &&

<p>

🌐 {perfil.sitioWeb}

</p>

}

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