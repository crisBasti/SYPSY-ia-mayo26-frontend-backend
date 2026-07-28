import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import { CATEGORY_INFO } from "../data/categories";



function CategoryPage() {

  const { categoria } = useParams();

  const info = CATEGORY_INFO[categoria] || CATEGORY_INFO.Otros;

  const descripcionCategoria =
  `Explorá productos y servicios de ${categoria} en SYPSY. Comprá y vendé con vendedores verificados y contacto directo.`;

  const { productos } =
    useContext(ProductsContext);

  const [orden, setOrden] = useState("recientes");

  const productosFiltrados = useMemo(() => {

  const lista = productos.filter(

        producto =>

            producto.categoria?.toLowerCase() ===
            categoria.toLowerCase()

    );

    switch (orden) {

        case "precioAsc":

            return [...lista].sort(
                (a,b)=>a.precio-b.precio
            );

        case "precioDesc":

            return [...lista].sort(
                (a,b)=>b.precio-a.precio
            );

        case "nombre":

            return [...lista].sort(
                (a,b)=>
                a.nombre.localeCompare(b.nombre)
            );

        default:

            return [...lista].sort(
                (a,b)=>

                new Date(b.createdAt||0)-
                new Date(a.createdAt||0)
            );

    }

},[productos,categoria,orden]);

return (
  <>
    <Helmet>

      <title>
        {categoria} | SYPSY Marketplace
      </title>

      <meta
        name="description"
        content={descripcionCategoria}
      />

      <meta
        property="og:title"
        content={`${categoria} | SYPSY Marketplace`}
      />

      <meta
        property="og:description"
        content={descripcionCategoria}
      />

      <meta
        property="og:url"
        content={`https://www.sypsy.com.ar/categoria/${categoria}`}
      />

      <meta
        property="og:type"
        content="website"
      />

    </Helmet>

    <div className="home-container">

      <div

className="category-hero"

style={{

backgroundImage:

`
linear-gradient(
90deg,
${info.color}ee,
rgba(17,24,39,.65)
),
url(${info.image})
`

}}

>


<div className="category-content">


<h1 className="category-title">

{info.icon} {categoria}

</h1>


<p>

{info.description}

</p>


<div className="category-stats">


<div>

<strong>

{productosFiltrados.length}

</strong>

<span>

Productos

</span>

</div>


<div>

<strong>

SYPSY

</strong>

<span>

Marketplace

</span>

</div>


<div>

<strong>

24/7

</strong>

<span>

Disponible

</span>

</div>


</div>


</div>


</div>

      <p className="category-subtitle">

         Encontramos

        <strong>

          {" "}

          {productosFiltrados.length}

          {" "}

        </strong>

          productos en esta categoría.

      </p>

      <div className="category-toolbar">

<select

value={orden}

onChange={(e)=>setOrden(e.target.value)}

>

<option value="recientes">

🆕 Más recientes

</option>

<option value="precioAsc">

💲 Menor precio

</option>

<option value="precioDesc">

💰 Mayor precio

</option>

<option value="nombre">

🔤 Nombre

</option>

</select>

</div>

      <div className="products-grid">

{

productosFiltrados.length > 0 ?

(

productosFiltrados.map(producto=>(

<ProductCard

key={producto._id}

product={producto}

/>

))

)

:

(

<div className="empty-category">

<h2>

Todavía no hay publicaciones.

</h2>

<p>

Sé el primero en vender en esta categoría 🚀

</p>

</div>

)

}

</div>

    </div>
     </>
  );
}

export default CategoryPage;