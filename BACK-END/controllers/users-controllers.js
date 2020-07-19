const HttpError=require('../models/http-error');
const User=require('../models/user');


const phonesignup=async(req,res,next)=>{
     const {phonenumber,players}=req.body;  
     let existingUser;
    try{
        existingUser=await User.findOne({phonenumber:phonenumber});

    }catch(err){
        const error=new HttpError('signing up failed plz try againg later',500);
        return next(error);
    }
  
        if(existingUser){
            const error=new HttpError('user exit already plz login insted',422);
            return next(error);
        }

    const createdUsers=new User({
        phonenumber,
        players
    });
    try{
        await createdUsers.save();
      }catch(err){
        const error=new HttpError('not found'+err,500);
        return next(error); 
      }
    res.status(201).json({users:createdUsers.toObject({getters:true})});
};
exports.phonesignup=phonesignup;
