const express=require('express');
const bodyParser=require('body-parser');
const HttpError=require('./models/http-error');
const app=express();
app.use(bodyParser.json());
//app.use('/api/places',placeRoute);
//app.use('/api/users',userRoute);
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
app.listen(5000); 
