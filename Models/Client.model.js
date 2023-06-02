const moogoose = require('mongoose')

const Schema = moogoose.Schema
const bcrypt =  require("bcrypt");
const ClientsSchema = new Schema({
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        default:"client"
    }, 
    password:{
        type:String,
        required:true, 
        default: "123456"
    },
    numero:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
   
})

ClientsSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(this.password, salt);
        this.password= hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

ClientsSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
        
    } catch (error) {
     throw error;   
    }
    
}

const Client = moogoose.model('client',ClientsSchema)

module.exports=Client;