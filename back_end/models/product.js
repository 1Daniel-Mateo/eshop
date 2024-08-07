const mongoose = require('mongoose');

//Cracion de constante con esquema
const ProductShema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    images:[{
        type:String
    }],
    brand:{
        type:String,
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type: Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default: Date.now
    }
})


// Método virtual para convertir _id a una cadena
ProductShema.virtual('id').get(function () {
    return this._id ? this._id.toHexString() : null;
});

// Habilitar los campos virtuales cuando se convierten a JSON
ProductShema.set('toJSON', {
    virtuals: true,
});


//Llamando al modelo
const Product = mongoose.model('Product', ProductShema);
module.exports = Product;