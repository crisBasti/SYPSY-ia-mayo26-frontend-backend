import { useEffect, useState } from "react";

import { getUsersService, updateUserService } from "../services/productService";

function AdminUsers() {

    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState("");

    useEffect(()=>{

        loadUsers();

    },[]);

    const loadUsers=async()=>{

        const data=

        await getUsersService();

        setUsers(data);

    };

    const toggleBlocked = async(user)=>{

    const updated =

    await updateUserService(

        user._id,

        {

            blocked: !user.blocked

        }

    );

    setUsers(

        users.map(u=>

            u._id===updated._id

            ? updated

            : u

        )

    );

};

const toggleVerified = async(user)=>{

    const updated = await updateUserService(

        user._id,

        {

            verifiedSeller: !user.verifiedSeller

        }

    );

    setUsers(

        users.map(u=>

            u._id===updated._id

            ? updated

            : u

        )

    );

};

const changeRole = async (

    user,

    role

)=>{

    const updated = await updateUserService(

        user._id,

        {

            role

        }

    );

    setUsers(

        users.map(u=>

            u._id===updated._id

            ? updated

            : u

        )

    );

};

    const filteredUsers = users.filter(user => {

    const text =

    `${user.nombre} ${user.apellido} ${user.email}`

    .toLowerCase();


    return text.includes(

        search.toLowerCase()

    );

});

    return(

        <div className="dashboard">

            <h1>

                👤 Usuarios

            </h1>

            <input

               type="text"

               placeholder="Buscar usuario..."

               value={search}

               onChange={(e)=>setSearch(e.target.value)}

            style={{
               padding:"10px",
               width:"300px",
               marginBottom:"20px"
              }}

            />

            <p>

                Total usuarios: {filteredUsers.length}

            </p>

            <table className="products-table">

                <thead>

                    <tr>

                        <th>Nombre</th>

                        <th>Email</th>

                        <th>Teléfono</th>

                        <th>Fecha</th>

                        <th>Estado</th>

                        <th>Verificado</th>

                        <th>Rol</th>

                        <th>Acción</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredUsers.map(user=>(

                            <tr key={user._id}>

                                <td>

                                    {user.nombre} {user.apellido}

                                </td>

                                <td>

                                    {user.email}

                                </td>

                                <td>

                                    {user.telefono}

                                </td>

                                <td>

                                    {

                                        new Date(

                                            user.createdAt

                                        ).toLocaleDateString()

                                    }

                                </td>

                                <td>

                                    {

                                      user.blocked

                                      ? "🚫 Bloqueado"

                                      : "🟢 Activo"

                                    }

                                </td>

                                <td>

                                    <button

                                       onClick={()=>toggleVerified(user)}

                                    >

                                 {

                                    user.verifiedSeller

                                     ? "⭐ Sí"

                                     : "☆ No"

                                 }

                                    </button>

                                </td>

                                <td>

<select

value={user.role}

onChange={(e)=>

changeRole(

user,

e.target.value

)

}

>

<option value="user">

Usuario

</option>

<option value="seller">

Seller

</option>

<option value="moderator">

Moderador

</option>

<option value="admin">

Administrador

</option>

</select>

</td>

                                <td>

                                    <button

                                      onClick={()=>toggleBlocked(user)}

                                    >

                                 {

                                    user.blocked

                                    ? "✅ Reactivar"

                                    : "🚫 Bloquear"

                                 }

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

export default AdminUsers;