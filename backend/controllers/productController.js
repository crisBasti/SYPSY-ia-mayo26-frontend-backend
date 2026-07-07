import Product from "../models/Product.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error obteniendo productos",
    });
  }
};

export const createProduct = async (req, res) => {
  try {

    const {
      nombre,
      precio,
      descripcion,    
      categoria,
      stock,
} = req.body;

const usuario = await User.findOne({
  uid: req.user.uid,
});

if (!usuario) {
  return res.status(404).json({
    message: "Usuario no encontrado",
  });
}



const newProduct = new Product({
  nombre,
  precio,
  descripcion,
  categoria,
  stock: stock || 0,

vendedor: {
  uid: usuario.uid,
  email: usuario.email,
  name: `${usuario.nombre} ${usuario.apellido}`,
  telefono: usuario.telefono
},

  images: req.files?.map(file => file.path) || []
});

    await newProduct.save();


    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const deleteProduct = async ( req, res ) => {
  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        mensaje:
          "Producto no encontrado"
      });
    }

    if (
      product.vendedor.uid !==
      req.user.uid
    ) {
      return res.status(403).json({
        mensaje:
          "No autorizado"
      });
    }

    await product.deleteOne();

    res.json({
      mensaje:
        "Producto eliminado"
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};


export const updateProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        mensaje:
          "Producto no encontrado"
      });
    }

    if (
      product.vendedor.uid !==
      req.user.uid
    ) {
      return res.status(403).json({
        mensaje:
          "No autorizado"
      });
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(
      updatedProduct
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

export const getMyProducts = async (
  req,
  res
) => {
  try {

    const products =
      await Product.find({
        "vendedor.uid":
          req.user.uid
      });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      mensaje:
        "Error obteniendo productos"
    });

  }
};

export const incrementView = async (
  req,
  res
) => {
  try {

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          views: 1
        }
      }
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const incrementWhatsappClick =
  async (req, res) => {

  try {

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          whatsappClicks: 1
        }
      }
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const getMyStats = async (req, res) => {
  try {

    const products = await Product.find({
      "vendedor.uid": req.user.uid
    });

    const totalProducts = products.length;

    const totalViews = products.reduce(
      (acc, product) => acc + (product.views || 0),
      0
    );

    const totalWhatsappClicks = products.reduce(
      (acc, product) => acc + (product.whatsappClicks || 0),
      0
    );

    const conversionRate =
      totalViews === 0
        ? 0
        : Number(
            (
              (totalWhatsappClicks / totalViews) *
              100
            ).toFixed(2)
          );

    res.json({
      totalProducts,
      totalViews,
      totalWhatsappClicks,
      conversionRate,
      products
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};