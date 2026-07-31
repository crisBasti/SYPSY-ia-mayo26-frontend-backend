import Order from "../models/order.js";
import User from "../models/User.js";
import Configuration from "../models/Configuration.js";
import { executeAction } from "../services/orderStateMachine.js";
import Product from "../models/Product.js";
import UserProfile from "../models/UserProfile.js";



// Crear pedido
export const crearPedido = async (req, res) => {

  try {

    const {
      vendedor,
      producto,
      precio,
      cantidad,
      costoEnvio
    } = req.body;


    const comprador =
      await User.findOne({
        uid: req.user.uid
      });
      

      const perfil = await UserProfile.findOne({
        uid:req.user.uid
      });


      if (
    !perfil ||
    !perfil.direccion ||
    !perfil.direccion.provincia ||
    !perfil.direccion.ciudad ||
    !perfil.direccion.barrio ||
    !perfil.direccion.calle ||
    !perfil.direccion.numero
) {

    return res.status(400).json({
        message: "Debes completar tu dirección de entrega antes de comprar."
    });

}



      const productoDB = await Product.findById(producto);

if(!productoDB){

    return res.status(404).json({

        message:"Producto inexistente"

    });

}

if(productoDB.vendedor.uid === req.user.uid){

    return res.status(400).json({

        message:"No puedes comprar tus propios productos."

    });

}


    if (!comprador) {

      return res.status(404).json({

        message: "Comprador no encontrado"

      });

    }


    const total =
  (precio * cantidad) + costoEnvio;


const configuracion =

    await Configuration.findOne();

const porcentaje =

    configuracion?.comisionGeneral || 5;

const comision =

    total * (porcentaje / 100);

  const ultimoPedido = await Order

    .findOne()

    .sort({

        createdAt: -1

    });


let numero = 1;


if (ultimoPedido?.numeroPedido) {

    numero =

        parseInt(

            ultimoPedido.numeroPedido

                .replace("SY-","")

        ) + 1;

}


const numeroPedido =

    `SY-${numero

        .toString()

        .padStart(6,"0")}`;


const codigoEntrega = Math.floor(

    100000 + Math.random() * 900000

  ).toString();


const nuevoPedido = new Order({

  numeroPedido,

  comprador:{

    uid:comprador.uid,

    email:comprador.email,

    name:`${comprador.nombre} ${comprador.apellido}`,

    telefono:comprador.telefono

},

  direccionEntrega:{

    nombre: comprador.nombre,

    telefono: perfil?.telefono || "",

    provincia: perfil?.direccion?.provincia || "",

    ciudad: perfil?.direccion?.ciudad || "",

    barrio: perfil?.direccion?.barrio || "",

    calle: perfil?.direccion?.calle || "",

    numero: perfil?.direccion?.numero || "",

    piso: perfil?.direccion?.piso || "",

    departamento: perfil?.direccion?.departamento || "",

    codigoPostal: perfil?.direccion?.codigoPostal || "",

    referencias: perfil?.direccion?.referencias || "",

    latitud: perfil?.ubicacion?.lat,

    longitud: perfil?.ubicacion?.lng

},

  vendedor,

  producto,

  precio,

  cantidad,

  costoEnvio,

  total,

  comision,

  codigoEntrega,

  historial: [
    {
      estado: "pendiente",
      descripcion: "Pedido creado"
    }
  ]

});


    await nuevoPedido.save();


    res.status(201).json(nuevoPedido);


  } catch (error) {


    res.status(500).json({

      message: error.message

    });


  }


  await Product.findByIdAndUpdate(

pedido.producto,

{

$inc:{

ordersGenerated:1

}

}

);

};

// Obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {

  try {

    const pedidos = await Order.find()

      .populate("producto")

      .sort({

        createdAt: -1

      });

    res.json(pedidos);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

// Obtener un pedido por ID
export const obtenerPedidoPorId = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener mis compras
export const obtenerMisCompras = async (req, res) => {

  try {

    const comprador =
      await User.findOne({
        uid: req.user.uid
      });


    const pedidos = await Order.find({

    "comprador.uid": req.user.uid

    })
    .populate("producto");


    res.json(pedidos);


  } catch (error) {

    res.status(500).json({

      message:error.message

    });

  }

};

// Obtener mis ventas
export const obtenerMisVentas = async (req, res) => {

  try {

    const pedidos =
      await Order.find({

        "vendedor.uid":
        req.user.uid

      })
      .populate("producto");


    res.json(pedidos);


  } catch (error) {

    res.status(500).json({

      message:error.message

    });

  }

};

// Actualizar estado del pedido
export const actualizarEstadoPedido = async (req, res) => {

    try {

        const { accion } = req.body;

        const pedido = await Order.findById(req.params.id);

        if (!pedido) {

            return res.status(404).json({

                message: "Pedido no encontrado"

            });

        }

        const accionesVendedor = [

    "ACEPTAR",

    "PREPARAR",

    "DESPACHAR"

];

if (accionesVendedor.includes(accion)) {

    if (pedido.vendedor.uid !== req.user.uid) {

        return res.status(403).json({

            message: "Solo el vendedor propietario puede realizar esta acción."

        });

    }

}

if (

    pedido.estadoPago !== "retenido"

    &&

    accion !== "CANCELAR"

){

    return res.status(400).json({

        message:

        "El pago todavía no fue verificado por SYPSY."

    });

}

        const estadoAnterior = pedido.estado;

        const nuevoEstado = executeAction(

            estadoAnterior,

            accion

        );

        pedido.estado = nuevoEstado;

        pedido.historial.push({

            estado: nuevoEstado,

            fecha: new Date(),
            
            descripcion: obtenerDescripcionEstado(nuevoEstado)

        });

        await pedido.save();

        res.json(pedido);

    }

    catch (error) {

        res.status(400).json({

            message: error.message

        });

    }

};


const obtenerDescripcionEstado = (estado) => {

  const mapa = {

    pendiente: "Pedido creado",

    aceptado: "El vendedor aceptó el pedido",

    preparando: "Producto en preparación",

    entregado: "Entregado al repartidor",

    finalizado: "Compra finalizada",

    pago_liberado: "Fondos liberados al vendedor",

    cancelado: "Pedido cancelado"

};

  return mapa[estado] || estado;

};

// Cancelar pedido
export const cancelarPedido = async (req, res) => {

  try {

    const pedido = await Order.findByIdAndUpdate(

      req.params.id,

      {

        estado: "cancelado"

      },

      {

        new: true

      }

    );

    if (!pedido) {

      return res.status(404).json({

        message: "Pedido no encontrado"

      });

    }

    res.json(pedido);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};



export const confirmarRecepcion = async (req, res) => {

  try {

    const comprador = await User.findOne({

      uid: req.user.uid

    });


    if (!comprador) {

      return res.status(404).json({

        message: "Comprador no encontrado"

      });

    }


    const pedido = await Order.findById(

      req.params.id

    );


    if (!pedido) {

      return res.status(404).json({

        message: "Pedido no encontrado"

      });

    }


    if (

        pedido.comprador.uid !== req.user.uid

      ) {

      return res.status(403).json({

        message: "No tienes permiso para confirmar este pedido"

      });

    }


    if (pedido.estado !== "entregado") {

      return res.status(400).json({

        message:

        "El pedido todavía no fue entregado"

      });

    }

    if(!pedido.codigoValidado){

    return res.status(400).json({

        message:"Primero debes validar el código de entrega."

    });

}


    pedido.estado = "finalizado";

    pedido.estadoPago = "liberado";

    pedido.fechaFinalizado = new Date();

    pedido.fechaLiberacion = new Date();

    pedido.historial.push({

    estado: "finalizado",

    descripcion: "Comprador confirmó la recepción del producto"

});

pedido.historial.push({

    estado: "pago_liberado",

    descripcion: "Fondos liberados al vendedor"

});

await pedido.save();

// Incrementar ventas realizadas del vendedor
const perfilVendedor = await UserProfile.findOne({
    uid: pedido.vendedor.uid
});

if (perfilVendedor) {

    perfilVendedor.ventasRealizadas += 1;

    await perfilVendedor.save();

}

res.json(pedido);


  } catch(error) {


    res.status(500).json({

      message:error.message

    });


  }

};


export const validarCodigoEntrega = async (req, res) => {

    try{

        const { codigo } = req.body;

        const comprador = await User.findOne({

            uid:req.user.uid

        });

        const pedido = await Order.findById(req.params.id);

        if(!pedido){

            return res.status(404).json({

                message:"Pedido no encontrado"

            });

        }

        if(

            pedido.comprador.uid.toString() !== req.user.uid

        ){

            return res.status(403).json({

                message:"No autorizado"

            });

        }

        if(

            pedido.codigoEntrega !== codigo

        ){

            return res.status(400).json({

                message:"Código incorrecto"

            });

        }

        pedido.codigoValidado = true;

        pedido.historial.push({

            estado:"codigo_validado",

            descripcion:"Comprador validó el código de entrega"

        });

        await pedido.save();

        res.json({

            ok:true

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


export const subirComprobantePago = async (req, res) => {

    try {
      
        const pedido = await Order.findById(req.params.id);

        if (!pedido) {

            return res.status(404).json({
                message: "Pedido no encontrado."
            });

        }

        if (pedido.comprador.uid !== req.user.uid) {

            return res.status(403).json({
                message: "Este pedido no pertenece a tu cuenta."
            });

        }

        if (!req.file) {

            return res.status(400).json({
                message: "No se recibió ningún comprobante."
            });

        }

        pedido.comprobantePago = req.file.path;

        pedido.fechaPago = new Date();

        pedido.estadoPago = "pendiente_verificacion";

        await pedido.save();

        res.json({
            message: "Comprobante recibido",
            pedido
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};


export const verificarPago = async (req, res) => {

    try {

        const { accion } = req.body;

        const pedido = await Order.findById(req.params.id);

        if (!pedido) {

            return res.status(404).json({
                message: "Pedido no encontrado."
            });

        }

        if (accion === "APROBAR") {

            pedido.estadoPago = "retenido";

            pedido.fechaVerificacion = new Date();

        }

        if (accion === "RECHAZAR") {

            pedido.estadoPago = "rechazado";

        }

        await pedido.save();

        res.json(pedido);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


export const dejarReseña = async (req,res)=>{

    try{

        const { puntuacion, comentario } = req.body;

        const pedido = await Order.findById(req.params.id);

        if(!pedido){

            return res.status(404).json({
                message:"Pedido inexistente."
            });

        }

        if(pedido.comprador.uid !== req.user.uid){

            return res.status(403).json({
                message:"No autorizado."
            });

        }

        if(pedido.estado !== "finalizado"){

            return res.status(400).json({
                message:"Solo puedes calificar compras finalizadas."
            });

        }

        if(pedido.reseña?.puntuacion){

            return res.status(400).json({
                message:"Ya calificaste este pedido."
            });

        }

        pedido.reseña={

            puntuacion,

            comentario,

            fecha:new Date()

        };

        await pedido.save();

        const perfil = await UserProfile.findOne({

            uid:pedido.vendedor.uid

        });

        if(perfil){

            const totalAnterior =
                perfil.calificacionPromedio *
                perfil.cantidadCalificaciones;

            perfil.cantidadCalificaciones += 1;

            perfil.calificacionPromedio = Number(

              (

                (totalAnterior + puntuacion)

                 /

                perfil.cantidadCalificaciones

              ).toFixed(2)

            );

            await perfil.save();

        }

        res.json({

            message:"Gracias por tu reseña.",

            pedido

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};