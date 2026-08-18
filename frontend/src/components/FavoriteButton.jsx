import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

import {
    agregarFavorito,
    eliminarFavorito,
    obtenerFavoritos
} from "../services/favoriteService";


function FavoriteButton({ productId }) {

    const { user } = useAuth();

    const [favorito, setFavorito] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const cargarEstado = async () => {

            if (!user) {

                setFavorito(false);

                return;

            }

            try {

                const token =
                    await auth.currentUser.getIdToken();

                const favoritos =
                    await obtenerFavoritos(token);

                setFavorito(

                    favoritos.some(
                        producto =>
                            producto._id === productId
                    )

                );

            } catch (error) {

                console.error(
                    "Error obteniendo favoritos:",
                    error
                );

            }

        };


        cargarEstado();

    }, [user, productId]);


    const toggleFavorito = async (e) => {

        e.preventDefault();
        e.stopPropagation();


        if (!user) {

            alert(
                "Iniciá sesión para guardar favoritos."
            );

            return;

        }


        if (loading) return;


        try {

            setLoading(true);

            const token =
                await auth.currentUser.getIdToken();


            if (favorito) {

                await eliminarFavorito(
                    productId,
                    token
                );

                setFavorito(false);

            } else {

                await agregarFavorito(
                    productId,
                    token
                );

                setFavorito(true);

            }

        } catch (error) {

            console.error(
                "Error actualizando favorito:",
                error
            );

            alert(
                "No se pudo actualizar el favorito."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <button

            type="button"

            className={`favorite-btn ${
                favorito ? "active" : ""
            }`}

            onClick={toggleFavorito}

            disabled={loading}

            title={
                favorito
                    ? "Quitar de favoritos"
                    : "Agregar a favoritos"
            }

        >

            {favorito ? "❤️" : "🤍"}

        </button>

    );

}


export default FavoriteButton;