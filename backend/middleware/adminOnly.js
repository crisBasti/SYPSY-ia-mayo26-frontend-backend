import User from "../models/User.js";

const adminOnly = async (req, res, next) => {

    try {

        const user = await User.findOne({
            uid: req.user.uid
        });

        if (!user) {

            return res.status(404).json({
                message: "Usuario no encontrado"
            });

        }

        if (user.role !== "admin") {

            return res.status(403).json({
                message: "Acceso denegado"
            });

        }

        next();

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export default adminOnly;