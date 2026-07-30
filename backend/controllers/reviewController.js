import Review from "../models/Review.js";
import Order from "../models/order.js";
import UserProfile from "../models/UserProfile.js";



export const crearResena = async (req,res)=>{

    try{

        const compradorUid = req.user.uid;


        const {
            pedidoId,
            puntuacion,
            comentario
        } = req.body;



        const pedido = await Order.findById(pedidoId);


        if(!pedido){

            return res.status(404).json({

                message:"Pedido no encontrado"

            });

        }



        // verificar que sea el comprador

        if(pedido.comprador.uid !== compradorUid){

            return res.status(403).json({

                message:"No puedes calificar este pedido"

            });

        }



        // verificar estado final

        if(
            pedido.estado !== "entregado" &&
            pedido.estado !== "finalizado"
        ){

            return res.status(400).json({

                message:"El pedido todavía no puede ser calificado"

            });

        }



        // evitar doble reseña

        const existe = await Review.findOne({

            pedido:pedidoId

        });



        if(existe){

            return res.status(400).json({

                message:"Este pedido ya tiene una reseña"

            });

        }



        const review = await Review.create({

            pedido:pedidoId,

            vendedorUid:
            pedido.vendedor.uid,

            compradorUid,

            puntuacion,

            comentario

        });



        // actualizar reputación vendedor

        const vendedor =
        await UserProfile.findOne({

            uid:
            pedido.vendedor.uid

        });



        if(vendedor){


            const totalAnterior =
            vendedor.calificacionPromedio *
            vendedor.cantidadCalificaciones;



            const nuevoTotal =
            vendedor.cantidadCalificaciones + 1;



            vendedor.calificacionPromedio =
            (
                totalAnterior + puntuacion
            )
            /
            nuevoTotal;



            vendedor.cantidadCalificaciones =
            nuevoTotal;



            vendedor.ventasRealizadas =
            (vendedor.ventasRealizadas || 0) + 1;



            await vendedor.save();

        }



        res.json({

            message:"Reseña creada correctamente",

            review

        });


    }
    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Error creando reseña"

        });

    }

};