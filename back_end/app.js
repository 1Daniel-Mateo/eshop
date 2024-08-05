//extensiones
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const app = express();

require("dotenv/config");

//  Enlace para coneccion URL 
const api = process.env.URL;
const productsRouter = require("./routers/products");
const categorysRouter = require("./routers/categorys");
const UsesRouter = require("./routers/users");
const OrderRouter = require("./routers/orders")

//Middlaware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.options("*", cors());
//Autenticacion Jwt
app.use(authJwt());
//Errores
app.use ((err,req,res,next) => errorHandler(err,req,res,next));

//Llamando al router
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categorys`, categorysRouter);
app.use(`${api}/users`, UsesRouter);
app.use(`${api}/orders`, OrderRouter);

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
