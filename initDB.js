const mongoose =  require('mongoose')
module.exports = ()=>{
    
mongoose.connect(
    'mongodb+srv://cluster1.ldwkhfi.mongodb.net/',{
   dbName:'Rest_Api',
   user:'ahmadkongodev',
   pass:'58Xj893eLB9QH1od',
   useNewUrlParser:true,
   useUnifiedTopology:true
}
).then(()=>{
    console.log('Mongo db connected ...');

});
}