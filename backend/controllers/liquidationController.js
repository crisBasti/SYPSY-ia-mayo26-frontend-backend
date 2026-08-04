import Liquidation from "../models/Liquidation.js";
import Order from "../models/order.js";
import UserProfile from "../models/UserProfile.js";


// Crear liquidación desde pedido liberado

export const crearLiquidacion = async (req,res)=>{

    try{

        const {pedidoId}=req.body;


        const pedido =
            await Order.findById(pedidoId);


        if(!pedido){

            return res.status(404).json({

                message:"Pedido no encontrado"

            });

        }


        if(
            pedido.estado !== "finalizado" ||
            pedido.estadoPago !== "liberado"
        ){

            return res.status(400).json({

                message:
                "El pedido todavía no está listo para liquidar."

            });

        }


        const existe =
            await Liquidation.findOne({
                pedido:pedidoId
            });


        if(existe){

            return res.status(400).json({

                message:
                "La liquidación ya existe."

            });

        }



        const perfil =
            await UserProfile.findOne({

                uid:pedido.vendedor.uid

            });



        const liquidacion =
        await Liquidation.create({

            pedido:pedido._id,

            vendedorUid:
            pedido.vendedor.uid,


            vendedorNombre:
            pedido.vendedor.name,


            montoVenta:
            pedido.total,


            comisionSYPSY:
            pedido.comision,


            montoLiquidar:
            pedido.total - pedido.comision,


            datosBancarios:
            perfil?.datosBancarios || {}

        });



        res.json(liquidacion);


    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};