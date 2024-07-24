const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    street:{
        type:String,
        default:''
    },
    apartment:{
        type:String,
        default:''
    },
    zip:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    }
    
})


// Método virtual para convertir _id a una cadena
userShema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Habilitar los campos virtuales cuando se convierten a JSON
userShema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('User', userShema);
module.exports = User