function ProductsTable({
    products
}) {

    return (

        <table className="dashboard-table">

            <thead>

                <tr>

                    <th>Producto</th>

                    <th>Visitas</th>

                    <th>Contactos</th>

                </tr>

            </thead>

            <tbody>

                {

                    products.map(product => (

                        <tr key={product._id}>

                            <td>

                                {product.nombre}

                            </td>

                            <td>

                                {product.views}

                            </td>

                            <td>

                                {product.whatsappClicks}

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}

export default ProductsTable;