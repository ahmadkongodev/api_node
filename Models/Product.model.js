const moogoose = require('mongoose')

const Schema = moogoose.Schema

const ProductsSchema = new Schema({
    image:{
        type:String,
        required:true
    }, 
    nom:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantite:{
        type:Number,
        required:true
    },
    prix:{
        type:Number,
        required:true
    }
})

const Product = moogoose.model('product',ProductsSchema)

module.exports=Product;