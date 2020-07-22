const express=require('express');
const bodyParser=require('body-parser');
const HttpError=require('./models/http-error');
const userRoute=require('./routes/user_login_routes');//login
const userIdRoutes=require('./routes/user_id_routes');// if(uid) {response : roomid}
const Register=require('./routes/register_routes');
const Admin=require('./routes/global_routes');



const mongoose=require('mongoose');
const app=express();
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');//Origin, X-Requested-With, Authorization, Content-Type,Access
    res.setHeader('Access-Control-Allow-Methods','*')
    next();
})
// app.use('/api/Login',userRoute);
// app.use('/api/',userIdRoutes); 
// app.use('/api/global',userIdRoutes);
// app.use('/api/Register',Register);
// app.use('/api/Admin',Admin);
// app.use('/api',Register);

app.use('/JAI_PUBG/Login',userRoute);
//app.use('/JAI_PUBG',userIdRoutes); 
app.use('/JAI_PUBG',userIdRoutes);
app.use('/JAI_PUBG/Register',Register);
app.use('/JAI_PUBG/Admin',Admin);
app.use('/JAI_PUBG',Register);
// SHOULD COMPLETE THE URL LINK
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
mongoose.connect('mongodb+srv://pubg:TCMJytM0Y4T0qz4R@cluster0.qofbg.mongodb.net/Hosting?retryWrites=true&w=majority', {
    useUnifiedTopology: true,             //THIS MIGHT RISE ERROR IN THE FUTURE
    useCreateIndex:true,
    useNewUrlParser: true
})
.then(()=>{
    console.log('successfully connected to the database');
    
    app.listen(5000); 
})
.catch(err=>{
    console.log(err);
});

