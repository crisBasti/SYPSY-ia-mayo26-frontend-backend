import { useEffect, useState } from "react";

import { auth } from "../firebase";

import {

    getReportsService,

    updateReportStatusService,

    deleteProductService

} from "../services/productService";

function AdminReports() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        const loadReports = async () => {

            const token =
                await auth.currentUser.getIdToken();

            const data =
                await getReportsService(token);

            setReports(data);

        };

        loadReports();

    }, []);


    const changeStatus = async (

    reportId,

    status

) => {

    try {

        const token =

            await auth.currentUser.getIdToken();

        await updateReportStatusService(

            reportId,

            status,

            token

        );

        setReports(

            reports.map(report =>

                report._id === reportId

                    ? {

                        ...report,

                        status

                    }

                    : report

            )

        );

    } catch (error) {

        console.error(error);

    }

};


const deleteReportedProduct = async (productId) => {

    const ok = window.confirm(
        "¿Eliminar definitivamente esta publicación?"
    );

    if (!ok) return;

    try {

        const token =
            await auth.currentUser.getIdToken();

        await deleteProductService(
            productId,
            token
        );

        setReports(

            reports.filter(
                r => r.productId?._id !== productId
            )

        );

        alert("Producto eliminado.");

    } catch (error) {

        console.error(error);

        alert("No se pudo eliminar.");

    }

};


    return (

        <div className="dashboard">

            <h1>

                🚩 Reportes recibidos

            </h1>

            <table className="products-table">

                <thead>

                    <tr>

                        <th>Producto</th>

                        <th>Motivo</th>

                        <th>Descripción</th>

                        <th>Estado</th>

                        <th>Fecha</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        reports.map(report => (

                            <tr key={report._id}>

                                <td>

                                   {report.productId ? (

                                   <a
                                      href={`/producto/${report.productId._id}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="admin-link"
                                >

                                    {report.productId.nombre}

                                    </a>

                                ) : (

                                    "Producto eliminado"

                                )}

                                </td>

                                <td>

                                    {report.reason}

                                </td>

                                <td>

                                    {report.description}

                                </td>

                                <td>

                                   <span className={`status ${report.status}`}>

                                      {report.status}

                                   </span>

                                </td>

                                <td>

                                    {

                                        new Date(

                                            report.createdAt

                                        ).toLocaleDateString()

                                    }

                                </td>

                                <td>

<button

onClick={()=>

changeStatus(

report._id,

"resolved"

)

}

>

✅ Aprobar

</button>

<button

onClick={()=>

changeStatus(

report._id,

"rejected"

)

}

>

❌ Rechazar

</button>

<button

onClick={()=>

deleteReportedProduct(

report.productId?._id

)

}

>

🗑 Eliminar publicación

</button>

</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AdminReports;