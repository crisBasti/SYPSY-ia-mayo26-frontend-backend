import PromotionCampaign from "../models/PromotionCampaign.js";


// ================================
// Crear campaña
// ================================

export const createCampaign = async (req, res) => {

    try {

        const campaign = await PromotionCampaign.create({

            ...req.body,

            vendedor: {

                uid: req.user.uid,

                email: req.user.email,

                name: req.user.name

            }

        });

        res.status(201).json(campaign);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// ================================
// Mis campañas
// ================================

export const getMyCampaigns = async (req, res) => {

    try {

        const campaigns = await PromotionCampaign

            .find({

                "vendedor.uid": req.user.uid

            })

            .populate("producto")

            .sort({

                createdAt: -1

            });

        res.json(campaigns);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// ================================
// Todas las campañas (Admin)
// ================================

export const getAllCampaigns = async (req, res) => {

    try {

        const campaigns = await PromotionCampaign

            .find()

            .populate("producto")

            .sort({

                createdAt: -1

            });

        res.json(campaigns);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// ================================
// Activar campaña
// ================================

export const activateCampaign = async (req, res) => {

    try {

        const campaign = await PromotionCampaign.findById(

            req.params.id

        );

        if (!campaign) {

            return res.status(404).json({

                message: "Campaña inexistente"

            });

        }

        campaign.estado = "activa";

        campaign.fechaInicio = new Date();

        campaign.fechaFin = new Date(

            Date.now() +

            campaign.plan.dias *

            24 *

            60 *

            60 *

            1000

        );

        await campaign.save();

        res.json(campaign);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// ================================
// Finalizar campaña
// ================================

export const finishCampaign = async (req, res) => {

    try {

        const campaign = await PromotionCampaign.findByIdAndUpdate(

            req.params.id,

            {

                estado: "finalizada"

            },

            {

                new: true

            }

        );

        res.json(campaign);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};