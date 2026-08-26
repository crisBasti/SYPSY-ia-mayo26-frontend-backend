import { useEffect, useState } from "react";
import {
    getUsersService,
    updateUserService
} from "../../services/productService";
import { getUserRewardTransactions } from "../../services/rewardService";

import { auth } from "../../firebase";

import "../../styles/adminUsers.css";


function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null);
    const [rewardTransactions, setRewardTransactions] = useState([]);
    const [loadingRewards, setLoadingRewards] = useState(false);


    useEffect(() => {

        loadUsers();

    }, []);


    const loadUsers = async () => {

        try {

            setLoading(true);

            const data = await getUsersService();

            setUsers(data);

        }

        catch (error) {

            console.error(
                "Error cargando usuarios:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // BLOQUEAR / REACTIVAR
    // ==========================================

    const toggleBlocked = async (user) => {

        try {

            const updated =
                await updateUserService(

                    user._id,

                    {
                        blocked:
                            !user.blocked
                    }

                );


            setUsers(

                users.map(u =>

                    u._id === updated._id
                        ? updated
                        : u

                )

            );

        }

        catch (error) {

            console.error(
                "Error actualizando estado:",
                error
            );

        }

    };


    // ==========================================
    // VERIFICAR SELLER
    // ==========================================

    const toggleVerified = async (user) => {

        try {

            const updated =
                await updateUserService(

                    user._id,

                    {
                        verifiedSeller:
                            !user.verifiedSeller
                    }

                );


            setUsers(

                users.map(u =>

                    u._id === updated._id
                        ? {
                            ...updated,
                            rspy: user.rspy || 0
                        }
                        : u

                )

            );

        }

        catch (error) {

            console.error(
                "Error actualizando verificación:",
                error
            );

        }

    };


    // ==========================================
    // CAMBIAR ROL
    // ==========================================

    const changeRole = async (
        user,
        role
    ) => {

        try {

            const updated =
                await updateUserService(

                    user._id,

                    {
                        role
                    }

                );


            setUsers(

                users.map(u =>

                    u._id === updated._id
                        ? {
                            ...updated,
                            rspy: user.rspy || 0
                        }
                        : u

                )

            );

        }

        catch (error) {

            console.error(
                "Error cambiando rol:",
                error
            );

        }

    };


    // ==========================================
    // FILTRAR
    // ==========================================

    const filteredUsers =
        users.filter(user => {

            const text =

                `${user.nombre || ""}
                ${user.apellido || ""}
                ${user.email || ""}`
                    .toLowerCase();


            return text.includes(
                search.toLowerCase()
            );

        });


    // ==========================================
    // ESTADÍSTICAS
    // ==========================================

    const totalUsuarios =
        users.length;


    const usuariosActivos =
        users.filter(
            user => !user.blocked
        ).length;


    const usuariosBloqueados =
        users.filter(
            user => user.blocked
        ).length;


    const totalRSPY =
        users.reduce(

            (total, user) =>

                total +
                Number(user.rspy || 0),

            0

        );


    if (loading) {

        return (

            <div className="admin-users">

                <div className="admin-users-loading">

                    <div className="admin-users-spinner"></div>

                    <p>
                        Cargando usuarios...
                    </p>

                </div>

            </div>

        );

    }



    const openRewardHistory = async (user) => {

    try {

        setSelectedUser(user);

        setLoadingRewards(true);

        setRewardTransactions([]);


        const currentUser =
            auth.currentUser;


        if (!currentUser) {

            throw new Error(
                "No hay un administrador autenticado."
            );

        }


        const token =
            await currentUser.getIdToken();


        const transactions =
            await getUserRewardTransactions(
                user.uid,
                token
            );


        setRewardTransactions(
            Array.isArray(transactions)
                ? transactions
                : []
        );

    }

    catch (error) {

        console.error(
            "Error obteniendo historial RSPY:",
            error
        );

        setRewardTransactions([]);

    }

    finally {

        setLoadingRewards(false);

    }

};


const saldoActual =
    rewardTransactions.length > 0
        ? rewardTransactions[0].saldoPosterior
        : 0;


    return (

        <div className="admin-users">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="admin-users-header">

                <div>

                    <span className="admin-users-eyebrow">
                        ADMINISTRACIÓN
                    </span>

                    <h1>
                        👥 Gestión de Usuarios
                    </h1>

                    <p>
                        Controlá usuarios, roles,
                        estados, verificaciones y
                        saldo RSPY.
                    </p>

                </div>

                <div className="reward-history-current-balance">

                  <span>
                    Saldo actual
                  </span>

                  <strong>
                      {Number(saldoActual).toLocaleString("es-AR")}
                      {" "}
                        RSPY
                  </strong>

                </div>

                <div className="admin-users-count">

                    <strong>
                        {filteredUsers.length}
                    </strong>

                    <span>
                        usuarios visibles
                    </span>

                </div>

            </div>


            {/* ======================================
                MÉTRICAS
            ====================================== */}

            <div className="admin-users-stats">


                <div className="admin-user-stat">

                    <div className="admin-user-stat-icon">
                        👥
                    </div>

                    <div>

                        <span>
                            Usuarios
                        </span>

                        <strong>
                            {totalUsuarios}
                        </strong>

                    </div>

                </div>


                <div className="admin-user-stat">

                    <div className="admin-user-stat-icon">
                        🟢
                    </div>

                    <div>

                        <span>
                            Activos
                        </span>

                        <strong>
                            {usuariosActivos}
                        </strong>

                    </div>

                </div>


                <div className="admin-user-stat">

                    <div className="admin-user-stat-icon">
                        🚫
                    </div>

                    <div>

                        <span>
                            Bloqueados
                        </span>

                        <strong>
                            {usuariosBloqueados}
                        </strong>

                    </div>

                </div>


                <div className="admin-user-stat rspy-stat">

                    <div className="admin-user-stat-icon">
                        🪙
                    </div>

                    <div>

                        <span>
                            RSPY en usuarios
                        </span>

                        <strong>
                            {totalRSPY.toLocaleString()}
                        </strong>

                    </div>

                </div>


            </div>


            {/* ======================================
                TOOLBAR
            ====================================== */}

            <div className="admin-users-toolbar">

                <div className="admin-users-search">

                    <span>
                        🔎
                    </span>

                    <input

                        type="text"

                        placeholder="Buscar por nombre o email..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                    {search && (

                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="admin-users-clear"
                        >
                            ✕
                        </button>

                    )}

                </div>


                <button
                    type="button"
                    className="admin-users-refresh"
                    onClick={loadUsers}
                >
                    ↻ Actualizar
                </button>

            </div>


            {/* ======================================
                TABLA
            ====================================== */}

            <div className="admin-users-table-wrapper">

                <table className="admin-users-table">

                    <thead>

                        <tr>

                            <th>Usuario</th>

                            <th>Contacto</th>

                            <th>Fecha</th>

                            <th>Estado</th>

                            <th>Verificación</th>

                            <th>RSPY</th>

                            <th>Rol</th>

                            <th>Acciones</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredUsers.map(user => (

                            <tr key={user._id}>


                                {/* USUARIO */}

                                <td>

                                    <div className="admin-user-identity">

                                        <div className="admin-user-avatar">

                                            {user.nombre
                                                ?.charAt(0)
                                                ?.toUpperCase() || "?"}

                                        </div>

                                        <div>

                                            <strong>

                                                {user.nombre}
                                                {" "}
                                                {user.apellido}

                                            </strong>

                                            <small>

                                                ID:
                                                {" "}
                                                {user.uid
                                                    ?.slice(0, 8)}
                                                ...

                                            </small>

                                        </div>

                                    </div>

                                </td>


                                {/* CONTACTO */}

                                <td>

                                    <div className="admin-user-contact">

                                        <span>
                                            {user.email}
                                        </span>

                                        {user.telefono && (

                                            <small>
                                                📞 {user.telefono}
                                            </small>

                                        )}

                                    </div>

                                </td>


                                {/* FECHA */}

                                <td>

                                    <span className="admin-user-date">

                                        {user.createdAt
                                            ? new Date(
                                                user.createdAt
                                            ).toLocaleDateString(
                                                "es-AR"
                                            )
                                            : "—"}

                                    </span>

                                </td>


                                {/* ESTADO */}

                                <td>

                                    <span
                                        className={
                                            user.blocked
                                                ? "admin-status blocked"
                                                : "admin-status active"
                                        }
                                    >

                                        {user.blocked
                                            ? "🚫 Bloqueado"
                                            : "🟢 Activo"}

                                    </span>

                                </td>


                                {/* VERIFICACIÓN */}

                                <td>

                                    <button

                                        type="button"

                                        className={
                                            user.verifiedSeller
                                                ? "admin-verified yes"
                                                : "admin-verified no"
                                        }

                                        onClick={() =>
                                            toggleVerified(user)
                                        }

                                    >

                                        {user.verifiedSeller
                                            ? "⭐ Verificado"
                                            : "☆ Sin verificar"}

                                    </button>

                                </td>


                                {/* RSPY */}

                                <td>

                                    <div className="admin-rspy">

                                        <span>
                                            🪙
                                        </span>

                                        <strong>

                                            {Number(
                                                user.rspy || 0
                                            ).toLocaleString()}

                                        </strong>

                                        <small>
                                            RSPY
                                        </small>

                                    </div>

                                </td>


                                {/* ROL */}

                                <td>

                                    <select

                                        className="admin-role-select"

                                        value={
                                            user.role || "user"
                                        }

                                        onChange={(e) =>
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


                                {/* ACCIONES */}

                                <td>


                                    <button
                                      type="button"
                                      className="reward-history-button"
                                      onClick={() =>
                                        openRewardHistory(user)
                                      }
                                    >
                                      🪙 RSPY
                                    </button>

                                    <button

                                        type="button"

                                        className={
                                            user.blocked
                                                ? "admin-action unblock"
                                                : "admin-action block"
                                        }

                                        onClick={() =>
                                            toggleBlocked(user)
                                        }

                                    >

                                        {user.blocked
                                            ? "✅ Reactivar"
                                            : "🚫 Bloquear"}

                                    </button>

                                    

                                </td>

                            </tr>

                        ))}


                        {filteredUsers.length === 0 && (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="admin-users-empty"
                                >

                                    <div>
                                        🔎
                                    </div>

                                    <strong>
                                        No encontramos usuarios
                                    </strong>

                                    <span>
                                        Probá con otro nombre
                                        o correo electrónico.
                                    </span>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            {/* ======================================
    HISTORIAL RSPY
====================================== */}

{selectedUser && (

    <div className="reward-history-overlay">

        <div className="reward-history-modal">

            <div className="reward-history-header">

                <div>

                    <span>
                        🪙 RSPY
                    </span>

                    <h2>
                        Historial RSPY
                    </h2>

                    <p>
                        {selectedUser.nombre}{" "}
                        {selectedUser.apellido}
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() => {
                        setSelectedUser(null);
                        setRewardTransactions([]);
                    }}
                >
                    ✕
                </button>

            </div>


            {/* CARGANDO */}

            {loadingRewards && (

                <div className="reward-history-state">

                    <span>
                        🪙
                    </span>

                    <p>
                        Cargando historial RSPY...
                    </p>

                </div>

            )}


            {/* HISTORIAL */}

            {!loadingRewards && (

                <div className="reward-history-content">

                    {rewardTransactions.length === 0 ? (

                        <div className="reward-history-empty">

                            <span>
                                🪙
                            </span>

                            <h3>
                                Sin movimientos RSPY
                            </h3>

                            <p>
                                Este usuario todavía no tiene
                                transacciones registradas.
                            </p>

                        </div>

                    ) : (

                        <>

                            <div className="reward-history-summary">

                                <span>
                                    Movimientos registrados
                                </span>

                                <strong>
                                    {rewardTransactions.length}
                                </strong>

                            </div>


                            <div className="reward-history-list">

                                {rewardTransactions.map(
                                    (transaction) => {

                                        const esGanado =
                                            transaction.tipo ===
                                            "ganado";

                                        const esGastado =
                                            transaction.tipo ===
                                            "gastado";

                                        return (

                                            <article
                                                key={
                                                    transaction._id
                                                }
                                                className={
                                                    `reward-history-item ${
                                                        esGanado
                                                            ? "earned"
                                                            : esGastado
                                                                ? "spent"
                                                                : "adjustment"
                                                    }`
                                                }
                                            >

                                                <div className="reward-history-item-main">

                                                    <div className="reward-history-icon">

                                                        {esGanado
                                                            ? "🟢"
                                                            : esGastado
                                                                ? "🔴"
                                                                : "🟡"}

                                                    </div>


                                                    <div>

                                                        <strong>

                                                            {esGanado
                                                                ? `+${transaction.cantidad}`
                                                                : esGastado
                                                                    ? `-${Math.abs(transaction.cantidad)}`
                                                                    : transaction.cantidad > 0
                                                                        ? `+${transaction.cantidad}`
                                                                        : `${transaction.cantidad}`}

                                                            {" "}
                                                            RSPY

                                                        </strong>


                                                        <p>
                                                            {
                                                                transaction.concepto
                                                            }
                                                        </p>

                                                        <small>

                                                            {transaction.createdAt
                                                                ? new Date(
                                                                    transaction.createdAt
                                                                ).toLocaleString(
                                                                    "es-AR"
                                                                )
                                                                : "—"}

                                                        </small>

                                                    </div>

                                                </div>


                                                <div className="reward-history-balances">

                                                    <div>

                                                        <span>
                                                            Saldo anterior
                                                        </span>

                                                        <strong>
                                                            {Number(
                                                                transaction.saldoAnterior || 0
                                                            ).toLocaleString(
                                                                "es-AR"
                                                            )}
                                                        </strong>

                                                    </div>


                                                    <div>

                                                        <span>
                                                            Saldo posterior
                                                        </span>

                                                        <strong>
                                                            {Number(
                                                                transaction.saldoPosterior || 0
                                                            ).toLocaleString(
                                                                "es-AR"
                                                            )}
                                                        </strong>

                                                    </div>

                                                </div>


                                                <div className="reward-history-meta">

                                                    <span>
                                                        Origen:
                                                    </span>

                                                    <strong>
                                                        {
                                                            transaction.origen ||
                                                            "sistema"
                                                        }
                                                    </strong>

                                                </div>

                                            </article>

                                        );

                                    }
                                )}

                            </div>

                        </>

                    )}

                </div>

            )}

        </div>

    </div>

)}




        </div>

    );

}


export default AdminUsers;
