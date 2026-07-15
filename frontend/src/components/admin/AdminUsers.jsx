import { useEffect, useState } from "react";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/api/users`

            );

            const data = await response.json();

            setUsers(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="dashboard">

            <h1>👥 Gestión de Usuarios</h1>

            <table className="users-table">

                <thead>

                    <tr>

                        <th>Nombre</th>

                        <th>Email</th>

                        <th>Rol</th>

                        <th>Estado</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map(user => (

                            <tr key={user._id}>

                                <td>

                                    {user.nombre} {user.apellido}

                                </td>

                                <td>

                                    {user.email}

                                </td>

                                <td>

                                    {user.role}

                                </td>

                                <td>

                                    {user.status}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AdminUsers;