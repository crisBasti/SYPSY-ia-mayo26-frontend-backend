import Product from "../models/Product.js";

export const obtenerProductosHome = async () => {

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

    // Separar por tipo
    const premium = productos.filter(

        p => p.nivelPromocion === 3

    );

    const destacados = productos.filter(

        p => p.nivelPromocion === 2

    );

    const promocionados = productos.filter(

        p => p.nivelPromocion === 1

    );

    const normales = productos.filter(

        p => !p.promocionado

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