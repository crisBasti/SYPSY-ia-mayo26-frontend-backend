import Configuration from "../models/Configuration.js";

export const getConfiguration = async (req, res) => {

    try {

        let config = await Configuration.findOne();

        if (!config) {

            config = await Configuration.create({

                mercadoPago: {

                    alias: "sypsy.arg",

                    cvu: "0000003100014719845478",

                    titular: "Cristian Alejandro Portillo"

                }

            });

        }

        res.json(config);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const updateConfiguration = async (req, res) => {

    try {

        let config = await Configuration.findOne();

        if (!config) {

            config = await Configuration.create({});

        }

        Object.assign(config, req.body);

        await config.save();

        res.json(config);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};