const mongoose =  require('mongoose')
const createError= require('http-errors')
const Location = require('../Models/Location.model')
module.exports={
    getAllLocations:async (req,res,next)=>{

        try {
            const results = await Location.find({},{__v:0});
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
        
    },
   
    createNewLocation:async (req,res,next)=>{
        try {
            const location = new Location(req.body);
            const result = await location.save()
            res.send(result)
        } catch (error) {
             console.log(error.message);  
             
             if(error.name ==="ValidationError"){
                next(createError(422,error.message));
                return;
             }
             next(error);
    } 
       
    }
    ,
    findLocationById:async (req,res,next)=>{
        const id =req.params.id
        try {
            const location= await Location.findById(id);
            if(!location){
                throw createError(404,"Location does not exist")
            }
            res.send(location);
        } catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid location id'));
                return;
            }
            next(error);        
        }
    },
    updateLocation:async(req,res,next)=>{
        const id =req.params.id;
        const updates = req.body;
        const options = {new: true}
        try {
            const result= await Location.findByIdAndUpdate(id,updates,options)
            if(!result){
                throw createError(404,"Location does not exist")
          
            }
            res.send(result);
        } catch (error) {
            if(error instanceof mongoose.CastError){
                return next(400,"Invalid Location Id"); 
                ;
            }
            next(error); 
                          
        }
    },
    deleteLocationById:async(req,res,next)=>{
        const id =req.params.id;
        try {
            const result= await Location.findByIdAndDelete(id)
            if(!result){
                throw createError(404,"Location does not exist")
            }
            res.send(result);
        } 
        catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Location id'));
                return;
            }
            next(error);              
        }
    },
    deleteLocationByProductId:async(req,res,next)=>{
        const id =req.params.id;
        try {
        const    result=await Location.findOneAndDelete(id);
            if(!result){
                throw createError(404,"Product does not exist")
            }
            res.send(result);
        } 
        catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Location id'));
                return;
            }
            next(error);              
        }
    }
}
