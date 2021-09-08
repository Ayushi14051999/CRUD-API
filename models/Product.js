const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Description:{
        type:String
    },
    Quantity:{
        type:Number,
        default:1
    },
    Company:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    ContactEmail:{
        type:String
    },
    Hash:{
        type:String,
        required:true
    }
},{timestamps: true});

const product=mongoose.model("products",productSchema);

module.exports=product;