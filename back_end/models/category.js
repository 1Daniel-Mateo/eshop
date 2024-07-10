const mongoose = require("mongoose");

const categoryShema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    color:{
        type:String
    },
    icon:{
        type:String
    },
    image:{
        type:String
    },
    
})

//llamar al modelo para exportalo
const Category = mongoose.model('Category', categoryShema);
module.exports = Category;