export default function getSmartBadges({

    product,
    distancia

}){

const badges=[];


// =======================
// ENTREGA
// =======================

if(product.entregaHoy){

    badges.push({

        texto:"Llega hoy",

        icono:"🚚",

        color:"green"

    });

}


// =======================
// DISTANCIA
// =======================

if(distancia){

    if(distancia < 1){

        badges.push({

            texto:`A ${distancia} km de vos`,

            icono:"📍",

            color:"blue"

        });

    }

    else if(distancia < 5){

        badges.push({

            texto:"Cerca de vos",

            icono:"📍",

            color:"cyan"

        });

    }

}


// =======================
// STOCK
// =======================

if(product.stock > 0 && product.stock <=3){

    badges.push({

        texto:"Últimas unidades",

        icono:"⚠",

        color:"orange"

    });

}


// =======================
// POPULARIDAD
// =======================

if(product.views > 20){

    badges.push({

        texto:"Producto buscado",

        icono:"🔥",

        color:"red"

    });

}


// =======================
// VENDEDOR
// =======================

if(product.vendedor?.verificado){

    badges.push({

        texto:"Vendedor verificado",

        icono:"⭐",

        color:"purple"

    });

}



return badges;


}