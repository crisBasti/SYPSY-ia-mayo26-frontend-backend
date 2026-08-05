import Product from "../models/Product.js";
import User from "../models/User.js";
import Analytics from "../models/Analytics.js";
import Report from "../models/Report.js";
import Promotion from "../models/Promotion.js";
import { obtenerProductosHome } from "../services/exposureService.js";
import UserProfile from "../models/UserProfile.js";

export const getProducts = async (req,res)=>{

    try{

        const lat = Number(req.query.lat);

        const lng = Number(req.query.lng);

        const productos = await obtenerProductosHome({

            lat,

            lng

        });

        res.json(productos);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            mensaje:"Error obteniendo productos"

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

const perfil = await UserProfile.findOne({

    uid: req.user.uid

});

if (!usuario) {
  return res.status(404).json({
    message: "Usuario no encontrado",
  });
}

if (usuario.blocked) {
  return res.status(403).json({
    message:
      "Tu cuenta fue suspendida. No podés publicar productos.",
  });
}

const newProduct = new Product({
  nombre,
  precio,
  descripcion,
  categoria,
  stock: stock || 0,
  estado: "activo",   // 🔥 AGREGAR ESTO

vendedor: {
    uid: usuario.uid,
    email: usuario.email,
    name: `${usuario.nombre} ${usuario.apellido}`,
    telefono: usuario.telefono,
    ciudad: perfil?.direccion?.ciudad || "",
    provincia: perfil?.direccion?.provincia || "",
    barrio: perfil?.direccion?.barrio || "",
    verificado: perfil?.verificado || false
},

ubicacion: {
    provincia: perfil?.direccion?.provincia || "",
    ciudad: perfil?.direccion?.ciudad || "",
    barrio: perfil?.direccion?.barrio || "",
    lat: perfil?.ubicacion?.lat,
    lng: perfil?.ubicacion?.lng
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

    const perfil = await UserProfile.findOne({
    uid: req.user.uid
});

const datosActualizar = {

    ...req.body,

    vendedor: {

        ...product.vendedor,

        ciudad: perfil?.direccion?.ciudad || "",

        provincia: perfil?.direccion?.provincia || "",

        barrio: perfil?.direccion?.barrio || "",

        verificado: perfil?.verificado || false

    },

    ubicacion: {

        provincia: perfil?.direccion?.provincia || "",

        ciudad: perfil?.direccion?.ciudad || "",

        barrio: perfil?.direccion?.barrio || "",

        lat: perfil?.ubicacion?.lat,

        lng: perfil?.ubicacion?.lng

    }

};

const updatedProduct = await Product.findByIdAndUpdate(

    req.params.id,

    datosActualizar,

    {

        new: true

    }

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


export const pausarProducto = async (req, res) => {

    try {

        const producto = await Product.findById(req.params.id);

        if (!producto) {

            return res.status(404).json({

                message: "Producto no encontrado"

            });

        }

        if (producto.vendedor.uid !== req.user.uid) {

            return res.status(403).json({

                message: "No autorizado"

            });

        }

        producto.estado = "pausado";

        producto.fechaPausado = new Date();

        await producto.save();

        res.json(producto);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

export const reactivarProducto = async (req,res)=>{

    try{

        const producto=await Product.findById(req.params.id);

        if(!producto){

            return res.status(404).json({

                message:"Producto no encontrado"

            });

        }

        if(producto.vendedor.uid!==req.user.uid){

            return res.status(403).json({

                message:"No autorizado"

            });

        }

        producto.estado="activo";

        producto.fechaPausado=null;

        await producto.save();

        res.json(producto);

    }

    catch(error){

        res.status(500).json({

            message:error.message

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

  type: "view",

  source: req.body.source || "unknown",

  search: req.body.search || "",

  device: req.body.device || "desktop"

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

  type: "whatsapp",

  source: req.body.source || "unknown",

  search: req.body.search || "",

  device: req.body.device || "desktop"

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

    // =====================
    // MONETIZACIÓN
    // =====================

const campaigns = await Promotion.find({
    sellerUid: req.user.uid
});

const activePromotions =
    campaigns.filter(c => c.estado === "activa").length;

const premiumProducts =
    campaigns.filter(
        c =>
            c.estado === "activa" &&
            c.tipo === "premium"
    ).length;

const featuredProducts =
    campaigns.filter(
        c =>
            c.estado === "activa" &&
            c.tipo === "destacado"
    ).length;

const totalRevenue =
    campaigns
        .filter(c =>
            ["pagada", "activa", "finalizada"].includes(c.estado)
        )
        .reduce(
            (acc, campaign) =>
                acc + (campaign.plan?.precio || 0),
            0
        );

    const totalProducts = products.length;

    const totalViews = products.reduce(
      (acc, product) => acc + (product.views || 0),
      0
    );

    const totalOrders = products.reduce(
  (acc, product) => acc + (product.ordersGenerated || 0),
  0
);

    const conversionRate =
totalViews === 0
? 0
: Number(
(
totalOrders /
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

    const averageOrders =
totalProducts === 0
? 0
: Number(
(
totalOrders /
totalProducts
).toFixed(1)
);

    res.json({
      totalProducts,
      totalViews,
      totalOrders,
      conversionRate,
      averageViews,
      averageOrders,
      mostViewed,
      mostContacted,
      products,
      activePromotions,
      premiumProducts,
      featuredProducts,
      totalRevenue
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const reportProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: "Producto no encontrado"
      });

    }

    const {

      reason,

      description

    } = req.body;

    await Report.create({

    productId: product._id,

    productName: product.nombre,

    productImage: product.images?.[0] || "",

    sellerUid: product.vendedor.uid,

    sellerName: product.vendedor.name,

    sellerEmail: product.vendedor.email,

    reason,

    description,

    reporterIp: req.ip

});

// Incrementar cantidad de reportes

product.reportsCount += 1;

// Si llega a 3 reportes se oculta automáticamente

if (product.reportsCount >= 3) {

    product.hidden = true;

}

await product.save();

    res.json({

      success: true,

      message: "Reporte enviado"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


const calcularRanking = (producto)=>{

    const views = producto.views || 0;

    const whatsapp = producto.whatsappClicks || 0;

    const promocion = producto.nivelPromocion || 0;

    return (

        views

        +

        whatsapp * 8

        +

        promocion * 500

    );

};