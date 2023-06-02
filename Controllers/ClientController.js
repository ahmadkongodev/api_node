const mongoose =  require('mongoose')
const createError= require('http-errors')
const Client = require('../Models/Client.model')
module.exports={
    getAllClients:async (req,res,next)=>{

        try {
            const results = await Client.find({},{__v:0});
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
        
    },
   
    createNewClient:async (req,res,next)=>{
        try {

            const {nom, prenom, username, password, numero, address}= req.body;
            const exist= await Client.findOne({username: username});

            if(exist) throw createError.Conflict('this username is already been registerd')

            const client = new Client(req.body);
            const result = await client.save();
            res.send(result)
        } catch (error) {
             console.log(error.message);  
             
             if(error.name ==="ValidationError"){
                next(createError(422,error.message));
                return;
             }
             next(error);
             console.log(error.message);  
    } 
       
    }
    ,
    findClientById:async (req,res,next)=>{
        const id =req.params.id
        try {
            const client= await Client.findById(id);
            if(!client){
                throw createError(404,"Client does not exist")
            }
            res.send(client);
        } catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Client id'));
                return;
            }
            next(error);        
        }
    },
    updateClient:async(req,res,next)=>{
        const id =req.params.id;
        const updates = req.body;
        const options = {new: true}
        try {
            const result= await Client.findByIdAndUpdate(id,updates,options)
            if(!result){
                throw createError(404,"Client does not exist")
            }
            res.send(result);
        } catch (error) {
            if(error instanceof mongoose.CastError){
                return next(400,"Invalid Client Id"); 
                
            }
            next(error); 
                          
        }
    },
    deleteClientById:async(req,res,next)=>{
        const id =req.params.id;
        try {
    
            const result= await Client.findByIdAndDelete(id)
            if(!result){
                throw createError(404,"Client does not exist")
            }
            res.send(result);
        } 
        catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid client id'));
                return;
            }
            next(error);              
        }
    },
    loginClient: async(req,res,next)=>{
        try {
            const {nom, prenom, username, password, numero, address}= req.body;
            const client= await Client.findOne({username: username});
            if(!client) throw createError.NotFound("User not registered")

            const isMatch = await client.isValidPassword(password);
            if(!isMatch) throw createError.Unauthorized('Username or password not validd')
            res.send(client);
        } catch (error) {
            next(error);
            console.log(error.message);  
        }
    }
}