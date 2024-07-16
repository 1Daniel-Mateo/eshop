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

//Metodo de consulta especifica
router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ success: false, message: "Error no se encuentra la categoria" });
  } else {
    res.send(category);
  }
});

// Metodo de registro
router.post(`/`, (req, res) => {
  const category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
    image: req.body.image,
  });

  //Función de almacenamiento de parametros
  category
    .save()
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

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
      image: req.body.image,
    },
    {
      new: true,
    }
  )

  if (!category) {
    return res.status(400).send('La categoria no fue creada');
  }else{
    res.send(category);
  }
});

// APP/id seleccion de id para eliminar
router.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "La categoria fue eliminada" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "La categoria no fue encontrada" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

//Metodo de exportacion de modulo
module.exports = router;
