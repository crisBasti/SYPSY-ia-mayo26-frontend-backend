import Promotion from "../models/Promotion.js";
import Product from "../models/Product.js";



// =====================================
// CREAR PROMOCIÓN
// =====================================

export const crearPromocion = async (req,res)=>{

    try{

        const {
            productId,
            plan
        } = req.body;


        const producto =
            await Product.findById(productId);


        if(!producto){

            return res.status(404).json({

                message:"Producto no encontrado"

            });

        }


        if(producto.vendedor.uid !== req.user.uid){

            return res.status(403).json({

                message:"No puedes promocionar un producto que no es tuyo."

            });

        }



        // ===========================
        // EVITAR PROMOCIONES DUPLICADAS
        // ===========================
        const promocionExistente = await Promotion.findOne({

    productId,

    estado:{

        $in:[
            "pendiente_pago",
            "activo"
        ]

    }

});

if(promocionExistente){

    return res.status(400).json({

        message:
        "Este producto ya tiene una promoción activa o pendiente."

    });

}



        const planes = {

            DESTACADO_24H:{

                precio:1500,

                duracionHoras:24

            },


            DESTACADO_7D:{

                precio:7000,

                duracionHoras:168

            },


            PREMIUM_30D:{

                precio:20000,

                duracionHoras:720

            }

        };


        if(!planes[plan]){

            return res.status(400).json({

                message:"Plan inválido"

            });

        }


        const nuevaPromocion =
            await Promotion.create({

                productId,

                sellerUid:req.user.uid,


                plan:{

                    nombre:plan,

                    precio:planes[plan].precio,

                    duracionHoras:
                    planes[plan].duracionHoras

                },


                estado:"pendiente_pago"

            });


        res.status(201).json(nuevaPromocion);


    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// =====================================
// ACTIVAR PROMOCIÓN
// =====================================

export const activarPromocion = async(req,res)=>{

    try{


        const promocion =
            await Promotion.findById(
                req.params.id
            );


        if(!promocion){

            return res.status(404).json({

                message:"Promoción no encontrada"

            });

        }



        const fechaInicio =
            new Date();


        const fechaFin =
            new Date(
                fechaInicio.getTime()
                +
                promocion.plan.duracionHoras
                *
                60
                *
                60
                *
                1000
            );



        promocion.estado="activo";

        promocion.fechaInicio=fechaInicio;

        promocion.fechaFin=fechaFin;



        await promocion.save();



        await Product.findByIdAndUpdate(

            promocion.productId,

            {
              promocionado: true,

              estadoPromocion: "activa",

              nivelPromocion:
                promocion.plan.nombre === "PREMIUM_30D"
                  ? 3
                  : promocion.plan.nombre === "DESTACADO_7D"
                  ? 2
                  : 1,

              fechaPromocionInicio: fechaInicio,

              fechaPromocionFin: fechaFin
            }

        );



        res.json(promocion);


    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// =====================================
// OBTENER MIS PROMOCIONES
// =====================================

export const obtenerMisPromociones = async(req,res)=>{

    try{


        const promociones =
            await Promotion.find({

                sellerUid:req.user.uid

            })

            .populate("productId");



        res.json(promociones);


    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// =====================================
// FINALIZAR PROMOCIÓN
// =====================================

export const finalizarPromocion = async(req,res)=>{

    try{


        const promocion =
            await Promotion.findById(
                req.params.id
            );


        if(!promocion){

            return res.status(404).json({

                message:"Promoción inexistente"

            });

        }



        promocion.estado="finalizado";


        await promocion.save();



        await Product.findByIdAndUpdate(

            promocion.productId,

            {
              promocionado:false,

              estadoPromocion:"vencida",

              nivelPromocion:0,

              fechaPromocionInicio:null,

              fechaPromocionFin:null
            }

        );



        res.json({

            message:"Promoción finalizada"

        });



    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// =====================================
// ESTADÍSTICAS
// =====================================

export const estadisticasPromocion = async(req,res)=>{


    try{


        const promocion =
            await Promotion.findById(
                req.params.id
            );



        if(!promocion){

            return res.status(404).json({

                message:"Promoción no encontrada"

            });

        }



        res.json({

    impresiones: promocion.impresiones,

    clicks: promocion.clicks,

    orders: promocion.orders,

    ctr:

        promocion.impresiones === 0

        ? 0

        : Number(

            (

                promocion.clicks /

                promocion.impresiones

            ) * 100

        ).toFixed(2)

});


    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


// =====================================
// PLANES DISPONIBLES
// =====================================

export const obtenerPlanes = (req, res) => {

    res.json([

        {
            id: "DESTACADO_24H",
            nombre: "Destacado 24 horas",
            precio: 1500,
            duracionHoras: 24,
            nivel: 1,
            beneficios: [
                "Aparece antes que publicaciones normales",
                "Etiqueta DESTACADO"
            ]
        },

        {
            id: "DESTACADO_7D",
            nombre: "Destacado 7 días",
            precio: 7000,
            duracionHoras: 168,
            nivel: 2,
            beneficios: [
                "Mayor exposición durante 7 días",
                "Prioridad en búsquedas"
            ]
        },

        {
            id: "PREMIUM_30D",
            nombre: "Premium 30 días",
            precio: 20000,
            duracionHoras: 720,
            nivel: 3,
            beneficios: [
                "Máxima prioridad",
                "Etiqueta PREMIUM",
                "Mayor visibilidad en Home"
            ]
        }

    ]);

};


export const registrarImpresion = async (req, res) => {

    try {

        await Promotion.updateMany(

            {

                productId: req.params.productId,

                estado: "activo"

            },

            {

                $inc: {

                    impresiones: 1

                }

            }

        );

        res.json({

            success: true

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


export const registrarClick = async(req,res)=>{

    try{

        await Promotion.updateMany(

            {

                productId:req.params.productId,

                estado:"activo"

            },

            {

                $inc:{

                    clicks:1

                }

            }

        );

        res.json({

            success:true

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};