import UserProfile from "../models/UserProfile.js";
import Product from "../models/Product.js";


// ================================
// AGREGAR FAVORITO
// ================================

export const agregarFavorito = async (req, res) => {

    try {

        const { productId } = req.params;

        const producto = await Product.findById(productId);

        if (!producto) {

            return res.status(404).json({
                message: "Producto no encontrado"
            });

        }

        const profile =
            await UserProfile.findOneAndUpdate(

                {
                    uid: req.user.uid
                },

                {
                    $addToSet: {
                        favoritos: producto._id
                    }
                },

                {
                    new: true,
                    upsert: true
                }

            );

        res.json({
            message: "Producto agregado a favoritos",
            favoritos: profile.favoritos
        });

    } catch (error) {

        console.error("Error agregando favorito:", error);

        res.status(500).json({
            message: "Error agregando favorito"
        });

    }

};


// ================================
// ELIMINAR FAVORITO
// ================================

export const eliminarFavorito = async (req, res) => {

    try {

        const { productId } = req.params;

        const profile =
            await UserProfile.findOneAndUpdate(

                {
                    uid: req.user.uid
                },

                {
                    $pull: {
                        favoritos: productId
                    }
                },

                {
                    new: true
                }

            );

        res.json({
            message: "Producto eliminado de favoritos",
            favoritos: profile?.favoritos || []
        });

    } catch (error) {

        console.error("Error eliminando favorito:", error);

        res.status(500).json({
            message: "Error eliminando favorito"
        });

    }

};


// ================================
// OBTENER FAVORITOS
// ================================

export const obtenerFavoritos = async (req, res) => {

    try {

        const profile =
            await UserProfile
                .findOne({
                    uid: req.user.uid
                })
                .populate("favoritos");

        res.json(
            profile?.favoritos || []
        );

    } catch (error) {

        console.error("Error obteniendo favoritos:", error);

        res.status(500).json({
            message: "Error obteniendo favoritos"
        });

    }

};