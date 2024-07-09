//extensiones

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();


require('dotenv/config');

//  Enlace para coneccion URL
const api = process.env.URL;

//Middlaware
app.use(bodyParser.json());
app.use(morgan('tiny')); 

//Cracion de constante con esquema
const ProductShema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})

//Llamando al modelo
const Product = mongoose.model('Product', ProductShema);

// Metodo de consulta

app.get(`${api}/products`, (req,res) =>{
    const product = {
        id: 1,
        name: "Gary",
        image: "Ortiz",
    }
    res.send(product);
})


// Metodo de registro

app.post(`${api}/products`, (req,res) =>{
    const NewProduct = req.body;
    console.log(NewProduct);
    res.send(NewProduct);
})

mongoose.connect(process.env.CONECCTION)
.then(()=>{
    console.log('Base de datos conecetada')
})
.catch(()=>{
    console.log(err)
})


app.listen(3000, ()=>{
    console.log(api);
    console.log('El servidor esta corriendo http://localhost:3000');
})