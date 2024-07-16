//extensiones
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv/config");

//  Enlace para coneccion URL 
const api = process.env.URL;
const productsRouter = require("./routers/products");
const categorysRouter = require("./routers/categorys");

//Middlaware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.options("*", cors());

//Llamando al router
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categorys`, categorysRouter);

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
