const HttpError=require('../models/http-error');
const User=require('../models/user');


const phonesignup=async(req,res,next)=>{
    
    
     const {phonenumber}=req.body;
    
    
    const createdUsers=new User({
        phonenumber
    });
    try{
        await createdUsers.save();
      }catch(err){
        const error=new HttpError('failed to insert the data of number into the database',500);
        return next(error); 
      }
    res.status(201).json({users:createdUsers.toObject({getters:true})});
    
};
exports.phonesignup=phonesignup;
