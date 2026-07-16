import Order from "../models/order.js";
import User from "../models/User.js";
import Configuration from "../models/Configuration.js";

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

  comision

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

    const { estado } = req.body;

    const pedido = await Order.findByIdAndUpdate(

      req.params.id,

      { estado },

      { new: true }

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
