//Exportacion de modelo
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

// Metodo de registro

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  //Función de almacenamiento de parametros
  product
    .save()
    .then((ProductCreated) => {
      res.status(201).json(ProductCreated);
    })
    //Caso de error 500
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

//Metodo de exportacion de modulo
module.exports = router;
