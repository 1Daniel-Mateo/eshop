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
    countInStock:{
        type:Number,
        required:true
    } 
})

//Llamando al modelo
const Product = mongoose.model('Product', ProductShema);

// Metodo de consulta general usando una funcion asincronica
app.get(`${api}/products`, async (req,res) =>{
    const productlist = await Product.find();
    if (!productlist) {
        res.status(500).json({success:false})
    } else {
        res.send(productlist);
    }
    
})


// Metodo de registro

app.post(`${api}/products`, (req,res) =>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    //Función de almacenamiento de parametros
    product.save().then((ProductCreated => {
        res.status(201).json(ProductCreated)
    }))
    //Caso de error 500
    .catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    }) 
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