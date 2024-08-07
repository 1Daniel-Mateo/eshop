//Exportacion de modelo
const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/product");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("tipo de imagen invalido");

    if (isValid) {
      uploadError = null;
    }
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fieldname = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

// Metodo de consulta general usando una funcion asincronica
router.get(`/`, async (req, res) => {
  const productlist = await Product.find();
  if (!productlist) {
    res.status(500).json({ success: false });
  } else {
    res.send(productlist);
  }
});

//Metodo de consulta especifica
router.get(`/:id`, async (req, res) => {
  const productE = await Product.findById(req.params.id);

  if (!productE) {
    res.status(500).json({ success: false });
  } else {
    res.send(productE);
  }
});

// Metodo de registro
router.post(`/`, upload.single("image"), async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Categoria Invalida");

  const file = req.file;
  if (!file) return res.status(400).send("Imagen Invalida");

  const fieldname = file.fieldname;
  const basePath = `${req.protocol}://${req.get("host")}/public/upload`;
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fieldname}`,
    //ruta de prueba "http://localhost:3000/public/upload/image-1"
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
  });

  //Función de almacenamiento de parametros
  const productSave = await product.save();

  if (!productSave) {
    return res.status(500).send("El producto no se pudo crear");
  } else {
    res.send(productSave);
  }
});

//Metodo de actualizacion
router.put("/:id", upload.single("image"), async (req, res) => {
  //LLamado al id de una categoria especifica
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Categoria Invalida");

  const product = await Category.findById(req.body.category);
  if (!product) return res.status(400).send("Producto Invalida");

  const file = req.file;
  let imagepath;
  if (file) {
    const fieldname = file.fieldname;
    const basePath = `${req.protocol}://${req.get("host")}/public/upload`;
    imagepath = `${basePath}${fieldname}`;
  } else {
    imagepath = product.image;
  }
  const productU = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagepath,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );

  if (!productU) {
    return res.status(400).send("El producto fue actualizado");
  } else {
    res.send(productU);
  }
});

//Metodo de eliminar rest api
router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Producto Invalido");
  }

  const productE = await Product.findByIdAndDelete(req.params.id);

  if (!productE) {
    res.status(500).json({ success: false });
  } else {
    res.send(productE);
  }
});

//Metodo de consulta filtrada por categoria
router.get(`/`, async (req, res) => {
  let filtrador = {};
  if (req.query.categories) {
    filtrador = { category: req.query.categories.split(",") };
  }

  const productlist = await Product.find(filtrador).populate("category");
  if (!productlist) {
    res.status(500).json({ success: false });
  } else {
    res.send(productlist);
  }
});

router.put('/galeria/:id', upload.array('images',10), async (req, res)=> {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Producto Invalido");
  }

  const files = req.files;
  let imagePaths = [];
  const basePath = `${req.protocol}://${req.get("host")}/public/upload`;

  if (files) {
    files.map(file =>{
      imagePaths.push(`${basePath}/${file.filename}`);
    })
  }

  const productU = await Product.findByIdAndUpdate(
    req.params.id,
    {
      images: imagePaths,
    },
    {new: true}
  );

  if (!productU) return res.status(400).send("Imagenes fueron actualizadas");

  res.send(productU);
  

})

//Metodo de exportacion de modulo
module.exports = router;
