//extensiones
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// const authJwt = require('./helpers/jwt');

const app = express();

require("dotenv/config");

//  Enlace para coneccion URL 
const api = process.env.URL;
const productsRouter = require("./routers/products");
const categorysRouter = require("./routers/categorys");
const UsesRouter = require("./routers/users");


//Middlaware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.options("*", cors());
//Autenticacion Jwt
// app.use(authJwt());

//Llamando al router
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categorys`, categorysRouter);
app.use(`${api}/users`, UsesRouter);

mongoose
  .connect(process.env.CONECCTION)
  .then(() => {
    console.log("Base de datos conecetada");
  })
  .catch(() => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log("El servidor esta corriendo http://localhost:3000");
});
