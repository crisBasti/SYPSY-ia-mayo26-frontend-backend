import Promotion from "../models/Promotion.js";
import Product from "../models/Product.js";
import { PROMOTION_PLANS } from "../config/promotionPlans.js";



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



        const planSeleccionado = PROMOTION_PLANS[plan];


        if(!planSeleccionado){

            return res.status(400).json({

                message:"Plan inválido"

            });

        }


        const nuevaPromocion =
            await Promotion.create({

                productId,

                sellerUid:req.user.uid,


                plan:{

                  nombre:planSeleccionado.id,

                  precio:planSeleccionado.precio,

                  duracionHoras:planSeleccionado.duracionHoras

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



        const fechaInicio = new Date();


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

                PROMOTION_PLANS[promocion.plan.nombre].nivel,

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

    res.json(

        Object.values(PROMOTION_PLANS)

    );

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


// =====================================
// PROMOCIONES PENDIENTES (ADMIN)
// =====================================

export const obtenerPromocionesPendientes = async (req,res)=>{

    try{

        const promociones = await Promotion.find({

            paymentStatus:"pendiente_verificacion"

        })

        .populate("productId")

        .sort({

            createdAt:-1

        });

        res.json(promociones);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


export const subirComprobantePromocion = async (req, res) => {

    try {

        const promocion = await Promotion.findById(req.params.id);

        if (!promocion) {

            return res.status(404).json({
                message: "Promoción no encontrada."
            });

        }

        if (promocion.sellerUid !== req.user.uid) {

            return res.status(403).json({
                message: "Esta promoción no pertenece a tu cuenta."
            });

        }

        if (!req.file) {

            return res.status(400).json({
                message: "No se recibió ningún comprobante."
            });

        }

        promocion.comprobantePago = req.file.path;

        promocion.fechaPago = new Date();

        promocion.estado = "pendiente_verificacion";

        promocion.paymentStatus = "pendiente_verificacion";

        await promocion.save();

        res.json({

            message: "Comprobante recibido.",

            promocion

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


export const verificarPagoPromocion = async (req, res) => {

    try {

        const { accion } = req.body;

        const promocion = await Promotion.findById(req.params.id);

        if (!promocion) {

            return res.status(404).json({
                message: "Promoción no encontrada."
            });

        }

        if (accion === "APROBAR") {

            const fechaInicio = new Date();

            const fechaFin = new Date(
                fechaInicio.getTime() +
                promocion.plan.duracionHoras * 60 * 60 * 1000
            );

            promocion.estado = "activo";
            promocion.paymentStatus = "approved";
            promocion.fechaVerificacion = new Date();
            promocion.fechaInicio = fechaInicio;
            promocion.fechaFin = fechaFin;
            promocion.spent = promocion.plan.precio;

            await promocion.save();

            await Product.findByIdAndUpdate(
                promocion.productId,
                {
                    promocionado: true,
                    estadoPromocion: "activa",
                    nivelPromocion:
                        PROMOTION_PLANS[promocion.plan.nombre].nivel,
                    fechaPromocionInicio: fechaInicio,
                    fechaPromocionFin: fechaFin
                }
            );

        }

        if (accion === "RECHAZAR") {

            promocion.estado = "rechazado";
            promocion.paymentStatus = "rejected";
            promocion.fechaVerificacion = new Date();
            promocion.spent = 0;

          await promocion.save();

        }

        res.json(promocion);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


export const obtenerPromocionPorId = async (req, res) => {

    try {

        const promocion = await Promotion
            .findById(req.params.id)
            .populate("productId");

        if (!promocion) {

            return res.status(404).json({

                message: "Promoción no encontrada."

            });

        }

        if (promocion.sellerUid !== req.user.uid) {

            return res.status(403).json({

                message: "No autorizado."

            });

        }

        res.json(promocion);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};