import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

import {
    obtenerFavoritos
} from "../services/favoriteService";

import ProductCard from "../components/ProductCard";


function Favorites() {

    const { user } = useAuth();

    const [favoritos, setFavoritos] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        cargarFavoritos();

    }, [user]);


    const cargarFavoritos = async () => {

        if (!user) {

            setFavoritos([]);

            setLoading(false);

            return;

        }


        try {

            setLoading(true);

            const token =
                await auth.currentUser.getIdToken();

            const data =
                await obtenerFavoritos(token);

            setFavoritos(data);

        } catch (error) {

            console.error(
                "Error cargando favoritos:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (
            <div>
                <h2>❤️ Favoritos</h2>
                <p>Cargando favoritos...</p>
            </div>
        );

    }


    return (

        <div>

            <h2>
                ❤️ Mis Favoritos
            </h2>


            {favoritos.length === 0 ? (

                <div>

                    <h3>
                        Todavía no tenés favoritos.
                    </h3>

                    <p>
                        Cuando encuentres un producto
                        que te interese, tocá ❤️ para
                        guardarlo acá.
                    </p>

                </div>

            ) : (

                <div className="products-grid">

                    {favoritos.map(producto => (

                        <ProductCard

                            key={producto._id}

                            product={producto}

                        />

                    ))}

                </div>

            )}

        </div>

    );

}


export default Favorites;