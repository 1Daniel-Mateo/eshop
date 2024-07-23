//Exportacion de modelo
const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/product");
const express = require("express");
const router = express.Router();

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
router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Categoria Invalida");

  const product = new Product(
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    }
  );

  //Función de almacenamiento de parametros
  const productSave = await product.save();

  if (!productSave) {
    return res.status(500).send("El producto no se pudo crear");
  } else {
    res.send(productSave);
  }
});

//Metodo de actualizacion
router.put("/:id", async (req, res) => {
  //LLamado al id de una categoria especifica
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Categoria Invalida");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
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

  if (!product) {
    return res.status(400).send("El producto fue actualizado");
  } else {
    res.send(product);
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
//Este metodo es unico
  const productlist = await Product.find(filtrador).populate("category");
  if (!productlist) {
    res.status(500).json({ success: false });
  } else {
    res.send(productlist);
  }
});

//Metodo de exportacion de modulo
module.exports = router;
