const HttpError=require('../models/http-error');
const Roomid=require('../models/global');

  const getById=async(req,res,next)=>{
    let Rids;
    try{
     Rids=await Roomid.find();
    }catch(err){
        const error=new HttpError('fetching users failed tryy again latet',500);
         return next(error);
     }
     res.json({Rids:Rids.map(Rid=>Rid.toObject({getters:true}))});
 };



const roomid=async(req,res,next)=>{
     const {id}=req.body;  
    const createdid=new Roomid({
       id:'1234'
    });
    try{
        await createdid.save();
      }catch(err){
        const error=new HttpError('connot store id',500);
        return next(error); 
      }
    res.status(201).json({ids:createdid.toObject({getters:true})});
};
exports.roomid=roomid;
exports.getById=getById;
