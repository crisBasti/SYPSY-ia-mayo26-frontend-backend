import Product from "../models/Product.js";

function calcularDistancia(lat1, lng1, lat2, lng2) {

    if (
        !lat1 ||
        !lng1 ||
        !lat2 ||
        !lng2
    ) {
        return 999999;
    }

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLng = (lng2 - lng1) * Math.PI / 180;

    const a =

        Math.sin(dLat / 2) *

        Math.sin(dLat / 2)

        +

        Math.cos(lat1 * Math.PI / 180)

        *

        Math.cos(lat2 * Math.PI / 180)

        *

        Math.sin(dLng / 2)

        *

        Math.sin(dLng / 2);

    const c =

        2 *

        Math.atan2(

            Math.sqrt(a),

            Math.sqrt(1 - a)

        );

    return Number((R * c).toFixed(2));

}

export const obtenerProductosHome = async ({ lat, lng } = {}) => {

    // Productos visibles
    const productos = await Product.find({

        estado: "activo",

        $or: [

            { hidden: false },

            { hidden: { $exists: false } }

        ]

    }).sort({

        createdAt: -1

    });


    if(lat && lng){

    productos.forEach(producto=>{

        producto._doc.distancia = calcularDistancia(

            lat,

            lng,

            producto?.ubicacion?.lat,

            producto?.ubicacion?.lng

        );

    });

}

    // Separar por tipo
    const premium = productos

.filter(

    p=>p.nivelPromocion===3

)

.sort(

(a,b)=>

(a.distancia||999999)

-

(b.distancia||999999)

);

    const destacados = productos

.filter(

p=>p.nivelPromocion===2

)

.sort(

(a,b)=>

(a.distancia||999999)

-

(b.distancia||999999)

);

    const promocionados = productos

.filter(

p=>p.nivelPromocion===1

)

.sort(

(a,b)=>

(a.distancia||999999)

-

(b.distancia||999999)

);

    const normales = productos

.filter(

p=>!p.promocionado

)

.sort(

(a,b)=>

(a.distancia||999999)

-

(b.distancia||999999)

);

    // Mezclar inteligentemente
    const promociones=

      rotarProductos([

        ...premium,

        ...destacados,

        ...promocionados

    ]);

    return mezclarProductos(

      promociones,

      normales

    );

};

function mezclarProductos(promocionados, normales) {

    const resultado = [];

    let premium = promocionados.filter(
        p => p.nivelPromocion === 3
    );

    let destacados = promocionados.filter(
        p => p.nivelPromocion === 2
    );

    let basicos = promocionados.filter(
        p => p.nivelPromocion === 1
    );

    let normalesIndex = 0;

    while (

        premium.length ||

        destacados.length ||

        basicos.length ||

        normalesIndex < normales.length

    ) {

        // 👑 Premium
        if (premium.length) {

            resultado.push(premium.shift());

        }

        // Normal
        if (normalesIndex < normales.length) {

            resultado.push(normales[normalesIndex++]);

        }

        // 🚀 Destacado
        if (destacados.length) {

            resultado.push(destacados.shift());

        }

        // Normal
        if (normalesIndex < normales.length) {

            resultado.push(normales[normalesIndex++]);

        }

        // ⭐ Destacado 24 h
        if (basicos.length) {

            resultado.push(basicos.shift());

        }

    }

    return resultado;

}


function rotarProductos(lista){

    if(lista.length<=1){

        return lista;

    }

    const indice=

        Math.floor(

            Date.now()/60000

        )

        %

        lista.length;

    return [

        ...lista.slice(indice),

        ...lista.slice(0,indice)

    ];

}