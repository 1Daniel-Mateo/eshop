//Exportacion de modelo
const Category = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categorylist = await Category.find();
  if (!categorylist) {
    res.status(500).json({ success: false });
  } else {
    res.send(categorylist);
  }
});

// Metodo de registro

router.post(`/`, (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  //Función de almacenamiento de parametros
  category.save()
    .then((categoryCreated) => {
      res.status(201).json(categoryCreated);
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
