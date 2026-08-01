import Promotion from "../models/Promotion.js";
import Product from "../models/Product.js";

export const iniciarSchedulerPromociones = () => {

    console.log("🚀 Scheduler de promociones iniciado.");

    setInterval(async () => {

        try {

            const ahora = new Date();

            const promociones = await Promotion.find({

                estado: "activo",

                fechaFin: { $lte: ahora }

            });

            if (!promociones.length) return;

            console.log(

              `[PROMOTION SCHEDULER] ${promociones.length} promociones vencidas`

            );

            for (const promo of promociones) {

                promo.estado = "finalizado";

                await promo.save();

                await Product.findByIdAndUpdate(

                    promo.productId,

                    {

                        promocionado: false,

                        nivelPromocion: 0,

                        fechaPromocionInicio: null,

                        fechaPromocionFin: null

                    }

                );

            }

        } catch (error) {

            console.error("Scheduler promociones:", error);

        }

    }, 60000); // revisar cada 60 segundos

};