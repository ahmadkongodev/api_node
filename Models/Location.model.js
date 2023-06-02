const moogoose = require('mongoose')

const Schema = moogoose.Schema

const LocationSchema = new Schema({
    date_debut:{
        type:Date,
        default:Date.now(),
        required:true
    }, 
     date_fin:{
        type:Date,
        required:true
    },
    id_client:{
        type:String,
        required:true
    },
    id_produit:{
        type:String,
        required:true
    }
    ,
    quantite_louer:{
        type:Number,
        required:true
    },
    etat:{
        type:String,
        default:"non remis",
        required:true
    }
})

const Location = moogoose.model('location',LocationSchema)

module.exports=Location;