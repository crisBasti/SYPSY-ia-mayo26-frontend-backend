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