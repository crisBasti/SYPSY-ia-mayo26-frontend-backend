import ProductCard from "./ProductCard";

function MyProducts({

    productos,

    deleteProduct,

    startEdit,

    editingId,

    editForm,

    setEditForm,

    updateProduct

}){

    return(

        <div className="products-section">

            <h2>

                Productos publicados

            </h2>

            <div className="products-grid">

                {

                    productos.map((product)=>(

                        <ProductCard

                            key={product._id}

                            product={product}

                            deleteProduct={deleteProduct}

                            startEdit={startEdit}

                            editingId={editingId}

                            editForm={editForm}

                            setEditForm={setEditForm}

                            updateProduct={updateProduct}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default MyProducts;