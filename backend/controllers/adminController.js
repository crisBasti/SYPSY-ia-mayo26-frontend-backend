import User from "../models/User.js";
import Product from "../models/Product.js";
import Advertisement from "../models/Advertisement.js";

export const getDashboardStats = async (req, res) => {

    try {

        const [

            totalUsers,

            totalSellers,

            verifiedSellers,

            totalAdmins,

            totalProducts,

            activeAds

        ] = await Promise.all([

            User.countDocuments(),

            User.countDocuments({ role: "seller" }),

            User.countDocuments({ verifiedSeller: true }),

            User.countDocuments({ role: "admin" }),

            Product.countDocuments(),

            Advertisement.countDocuments({ active: true })

        ]);

        res.json({

            totalUsers,

            totalSellers,

            verifiedSellers,

            totalAdmins,

            totalProducts,

            activeAds

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};