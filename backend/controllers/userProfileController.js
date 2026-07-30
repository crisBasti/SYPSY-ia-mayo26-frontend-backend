import UserProfile from "../models/UserProfile.js";

// Obtener perfil
export const getProfile = async (req, res) => {

    try {

        let profile = await UserProfile.findOne({
            uid: req.user.uid
        });

        if (!profile) {

            profile = await UserProfile.create({

                uid: req.user.uid,
                email: req.user.email,
                name: req.user.name || ""

            });

        }

        res.json(profile);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error obteniendo perfil"
        });

    }

};


// Actualizar perfil

export const updateProfile = async (req, res) => {

    try {

        const profile =
            await UserProfile.findOneAndUpdate(

                {
                    uid: req.user.uid
                },

                req.body,

                {
                    new: true,
                    upsert: true
                }

            );

        res.json(profile);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error actualizando perfil"
        });

    }

};


// Obtener perfil público de un vendedor
export const getPublicProfile = async (req, res) => {

    try {

        const profile = await UserProfile.findOne({

            uid: req.params.uid

        });

        if (!profile) {

            return res.status(404).json({

                message: "Perfil no encontrado"

            });

        }

        res.json({

            name: profile.name,

            logo: profile.logo,

            descripcion: profile.descripcion,

            verificado: profile.verificado,

            ventasRealizadas: profile.ventasRealizadas,

            calificacionPromedio: profile.calificacionPromedio,

            cantidadCalificaciones: profile.cantidadCalificaciones

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};