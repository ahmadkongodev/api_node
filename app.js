const express = require('express')


const createError= require('http-errors')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//initialize DB
require ('./initDB')();
const ProductRoute=require('./Routes/Products.route');
app.use('/products',ProductRoute )



const LocationRoute=require('./Routes/Locations.route');
app.use('/locations',LocationRoute )



const ClientRoute=require('./Routes/Clients.route');
app.use('/clients',ClientRoute )


app.use((req,res,next)=>{
    
    next(createError(404,"Not Found"));
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    console.log(err);  

    res.send({
        error:{
            status:err.status || 500,
            message: err.message
        }
    })
})
app.listen(3000,() => {
    console.log('server started on 3000')
}); 