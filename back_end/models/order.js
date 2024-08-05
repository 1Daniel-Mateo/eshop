const mongoose = require('mongoose');


const orderShema = mongoose.Schema({
    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    shippingAddress1:{
        type: String,
        required:true
    },
    shippingAddress2:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    dateOrdered:{
        type:Date,
        default:Date.now
    }

})

// Método virtual para convertir _id a una cadena
orderShema.virtual('id').get(function () {
    return this._id ? this._id.toHexString() : null;
});

// Habilitar los campos virtuales cuando se convierten a JSON
orderShema.set('toJSON', {
    virtuals: true
});

const order = mongoose.model('Order', orderShema);
module.exports = order;