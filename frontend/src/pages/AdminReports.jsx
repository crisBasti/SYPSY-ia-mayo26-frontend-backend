import { useEffect, useState } from "react";

import { auth } from "../firebase";

import {

    getReportsService,

    updateReportStatusService

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

                                    {

                                        report.productId?.nombre ||

                                        "Producto eliminado"

                                    }

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