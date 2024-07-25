const User = require("../models/user");
const express = require("express");
const router = express.Router();
//Libreria de encritacion de contraseña
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  } else {
    res.send(userList);
  }
});

router.get(`/:id`, async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  //Select es el metodo que utilizamos para definir que campos no debe ver - y tambien especificar que campos puede ver
  if (!user) {
    res
      .status(500)
      .json({ success: false, message: "Error no se encuentra la categoria" });
  } else {
    res.send(user);
  }
});

// Metodo de registro de usuario
router.post(`/`, async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    //Encriptacion de contraseña
    passwordHash: bcrypt.hashSync(req.body.password, 12),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  //Función de almacenamiento de parametros
  const UserSave = await user.save();

  if (!UserSave) {
    return res.status(500).send("El Usuario no se pudo crear");
  } else {
    res.send(UserSave);
  }
});

//Metodos de logeo
router.post(`/login`, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //Enlace de token
  const secret = process.env.secret;

  if (!user) {
    return res.status(400).send("Usuario no encontrado");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    res.status(400).send("¡Contraseña erronea!");
  } else {
    //Enlace de token

    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, secret);
    res.status(200).send({ user: user.email, token: token });
  }
});

module.exports = router;
