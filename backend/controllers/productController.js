import Product from "../models/Product.js";

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

        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

    const {
      nombre,
      precio,
      descripcion,    
      categoria,
      stock,
} = req.body;



const newProduct = new Product({
  nombre,
  precio,
  descripcion,
  categoria,
  stock: stock || 0,

vendedor: {
  uid: req.user.uid,
  email: req.user.email || "",
  name: req.user.name || "Usuario"
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