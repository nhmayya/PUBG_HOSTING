const express=require('express');
const bodyParser=require('body-parser');
const HttpError=require('./models/http-error');
const userRoute=require('./routes/user_register_routes');//login
const userIdRoutes=require('./routes/user_id_routes');// if(uid) {response : roomid}
// const SEAT=require('./routes/');
// const Register=require('./routes/');
// const userIdRoutes=require('./routes/');


const mongoose=require('mongoose');
const app=express();
app.use(bodyParser.json());
app.use('/api/Login',userRoute);
app.use('/api/',userIdRoutes); // SHOULD COMPLETE THE URL LINK
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
mongoose.connect('mongodb+srv://pubg:TCMJytM0Y4T0qz4R@cluster0.qofbg.mongodb.net/Hosting?retryWrites=true&w=majority')
.then(()=>{
    console.log('successfully connected to the database');
    
    app.listen(5000); 
})
.catch(err=>{
    console.log(err);
});

