const express=require('express');
const bodyParser=require('body-parser');
const HttpError=require('./models/http-error');
const mongoose=require('mongoose');
const app=express();
app.use(bodyParser.json());
//app.use('/api/places',placeRoute);
//app.use('/api/users',userRoute);
//we have to import and use the routes folder
app.use((req,res,next)=>{
    const error=new HttpError('Invalid URL',404);
    throw error;   
});
app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code||500).json({message:error.message||"something went wrong in catch block..."});

});
mongoose.connect('mongodb+srv://jhondeo:UWnO1ONk0r8YAWcV@cluster0.jt5tn.mongodb.net/hosting?retryWrites=true&w=majority')
.then(()=>{
    console.log('successfully connected to the database');
    
    app.listen(5000); 
})
.catch(err=>{
    console.log(err);
});

