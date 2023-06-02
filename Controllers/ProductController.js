const mongoose =  require('mongoose')
const createError= require('http-errors')
const Product = require('../Models/Product.model')
module.exports={
    getAllProducts:async (req,res,next)=>{

        try {
            const results = await Product.find({},{__v:0});
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
        
    },
    getAllTables:async (req,res,next)=>{

        try {
            const results = await Product.find({nom: "Table"},{__v:0});
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
        
    },
    getAllChairs:async (req,res,next)=>{

        try {
            const results = await Product.find({nom: "Chaise"},{__v:0});
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
        
    },
    getAllBaches:async (req,res,next)=>{

        try {
            const results = await Product.find({nom: "Bache"},{__v:0});
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
        
    },
    getAllPodiums:async (req,res,next)=>{

        try {
            const results = await Product.find({nom: "Podium"},{__v:0});
            if(!results){
                res.send("no podium")
            }
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
        
    },
    createNewProduct:async (req,res,next)=>{
        try {
            const product = new Product(req.body);
            const result = await product.save()
            res.send(result)
        } catch (error) {
             console.log(error.message);  
             
             if(error.name ==="ValidationError"){
                next(createError(422,error.message));
                return;
             }
             next(error);
    } 
        // const product = new Product({
        //     nom:req.body.nom,
        //     prix:req.body.prix
        // })
        // product.save()
        // .then(result => {
        //     console.log(result);
        //     res.send(result)
        // })
        // .catch(err =>{
        //     console.log(err.message);       
        // })
    }
    ,
    findProductById:async (req,res,next)=>{
        const id =req.params.id
        try {
            const product= await Product.findById(id);
            if(!product){
                throw createError(404,"Product does not exist")
            }
            res.send(product);
        } catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Product id'));
                return;
            }
            next(error);        
        }
    },
    updateProduct:async(req,res,next)=>{
        const id =req.params.id;
        const updates = req.body;
        const options = {new: true}
        try {
            const result= await Product.findByIdAndUpdate(id,updates,options)
            if(!result){
                throw createError(404,"Product does not exist")
          
            }
            res.send(result);
        } catch (error) {
            if(error instanceof mongoose.CastError){
                return next(400,"Invalid Product Id"); 
                ;
            }
            next(error); 
                          
        }
    },
    deleteProductById:async(req,res,next)=>{
        const id =req.params.id;
        try {
    
            const result= await Product.findByIdAndDelete(id)
            if(!result){
                throw createError(404,"Product does not exist")
            }
            res.send(result);
        } 
        catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Product id'));
                return;
            }
            next(error);              
        }
    }
}