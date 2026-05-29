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
    const {
      nombre,
      precio,
      descripcion,    
      categoria,
      stock,
      vendedor
} = req.body;

const parsedSeller = vendedor ? JSON.parse(vendedor) : null;

const newProduct = new Product({
  nombre,
  precio,
  descripcion,
  categoria,
  stock: stock || 0,

  vendedor: {
    uid: parsedSeller.uid,
    email: parsedSeller.email,
    name: parsedSeller.name
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

export const deleteProduct = async (req, res) => {

  try {

    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.json({
      mensaje: "Producto eliminado"
    });

  } catch (error) {

  console.log(
    "ERROR COMPLETO:",
    JSON.stringify(
      error,
      null,
      2
    )
  );

  res.status(500).json({

    message:
      error.message,

    error
  });
}
};


export const updateProduct = async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }
      );

    res.json(updatedProduct);

  } catch (error) {

  console.log(
    "ERROR COMPLETO:",
    JSON.stringify(
      error,
      null,
      2
    )
  );

  res.status(500).json({

    message:
      error.message,

    error
  });
}
};
