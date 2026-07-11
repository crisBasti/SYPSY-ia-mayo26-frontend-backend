import Advertisement from "../models/Advertisement.js";

// Obtener todas las campañas

export const getAdvertisements = async (req, res) => {

    try {

        const ads = await Advertisement.find()

            .sort({ createdAt: -1 });

        res.json(ads);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Crear campaña

export const createAdvertisement = async (req, res) => {

    try {

        const ad = await Advertisement.create(req.body);

        res.status(201).json(ad);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Actualizar campaña

export const updateAdvertisement = async (req, res) => {

    try {

        const ad = await Advertisement.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(ad);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Eliminar campaña

export const deleteAdvertisement = async (req, res) => {

    try {

        await Advertisement.findByIdAndDelete(

            req.params.id

        );

        res.json({

            success: true

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Registrar impresión de publicidad

export const registerImpression = async (req,res)=>{

    try{

        const ad = await Advertisement.findByIdAndUpdate(

            req.params.id,

            {
                $inc:{
                    impressions:1
                }
            },

            {
                new:true
            }

        );

        if(!ad){

            return res.status(404).json({

                message:"Publicidad no encontrada"

            });

        }


        res.json({

            success:true,

            impressions:ad.impressions

        });


    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



// Registrar click de publicidad

export const registerClick = async (req,res)=>{

    try{

        const ad = await Advertisement.findByIdAndUpdate(

            req.params.id,

            {
                $inc:{
                    clicks:1
                }
            },

            {
                new:true
            }

        );


        if(!ad){

            return res.status(404).json({

                message:"Publicidad no encontrada"

            });

        }


        res.json({

            success:true,

            clicks:ad.clicks

        });


    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};