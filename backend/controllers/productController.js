import Product from "../models/Product.js";
import User from "../models/User.js";
import Analytics from "../models/Analytics.js";

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

    const product =
      await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        message: "Producto no encontrado"
      });

    }

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          views: 1
        }
      }
    );

    await Analytics.create({

      productId: product._id,

      sellerUid: product.vendedor.uid,

      type: "view"

    });

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

    const product =
      await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        message: "Producto no encontrado"
      });

    }

    await Product.findByIdAndUpdate(

      req.params.id,

      {

        $inc: {
          whatsappClicks: 1
        }

      }

    );

    await Analytics.create({

      productId: product._id,

      sellerUid: product.vendedor.uid,

      type: "whatsapp"

    });

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
              totalWhatsappClicks /
              totalViews *
              100
            ).toFixed(2)
          );

    // =====================
    // Producto más visto
    // =====================

    const mostViewed =
      [...products].sort(
        (a, b) => b.views - a.views
      )[0] || null;

    // =====================
    // Producto con más contactos
    // =====================

    const mostContacted =
      [...products].sort(
        (a, b) =>
          b.whatsappClicks -
          a.whatsappClicks
      )[0] || null;

    // =====================
    // Promedio de vistas
    // =====================

    const averageViews =
      totalProducts === 0
        ? 0
        : Number(
            (
              totalViews /
              totalProducts
            ).toFixed(1)
          );

    // =====================
    // Promedio de contactos
    // =====================

    const averageWhatsappClicks =
      totalProducts === 0
        ? 0
        : Number(
            (
              totalWhatsappClicks /
              totalProducts
            ).toFixed(1)
          );

    res.json({
      totalProducts,
      totalViews,
      totalWhatsappClicks,
      conversionRate,
      averageViews,
      averageWhatsappClicks,
      mostViewed,
      mostContacted,
      products
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};