import Order from "../models/order.js";
import User from "../models/User.js";
import Configuration from "../models/Configuration.js";
import { executeAction } from "../services/orderStateMachine.js";


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


const nuevoPedido = new Order({

  numeroPedido,

  comprador: comprador._id,

  vendedor,

  producto,

  precio,

  cantidad,

  costoEnvio,

  total,

  comision,

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


    const pedidos =
      await Order.find({
        comprador: comprador._id
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

      pedido.comprador.toString() !== comprador._id.toString()

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


    pedido.estado = "finalizado";

    pedido.fechaFinalizado = new Date();


    pedido.historial.push({

      estado: "finalizado",

      descripcion:

      "Comprador confirmó recepción del producto"

    });


    await pedido.save();


    res.json(pedido);


  } catch(error) {


    res.status(500).json({

      message:error.message

    });


  }

};