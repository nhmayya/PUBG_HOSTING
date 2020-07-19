const express = require('express')
const HttpError=require('../models/http-error');
const User=require('../models/users');
//const User=require('')


  const getById=async(req,res,next)=>{
   const Uid=req.params.uid;
   let existingId;
   try{
     existingId=await User.findById(Uid);
     if(!existingId||existingId.length==0){
      const error=new HttpError('user id not found',404);
      return next(error);
    }
    // const Roomid = //code to get room id from database
    res.json({Roomid:id});


   }catch(err){
    const error=new HttpError("fetching id failed plz try again",500);
    return next(error);
   }




// const HttpError=require('../models/http-error');
// const Uid=require('../models/users');

//   const getById=async(req,res,next)=>{
//     const {id}=req.parms.;
//     let existingId;
//     try{
//       existingId=await Roomid.find();
//     }
//     catch(err){
//       const error=new HttpError("fetching id failed plz try again",500);
//       return next(error);
//     }
//     if(!existingId||existingId.length==0){
//         const error=new HttpError('room id not exit plz wait for sometime',404);
//         return next(error);
//       }
//       res.json({existingId:existingId.map(Rid=>Rid.toObject({getters:true}))});

//     /***************************/
//     // let existingId=async()=>{
//     //             existingId=await Roomid.find();
//     //        return(existingId);
//     // }
//     // existingId().then((result)=>{
//     //   if(!result||result.length==0){
//     //     const error=new HttpError("room id is not there",404);
//     //           return next(error);
//     //   }
//     //   res.json({existingId:existingId.map(Rid=>Rid.toObject({getters:true}))});
//     // }).catch((e)=>{
//     //   const error=new HttpError("fetching id failed plz try again"+e,500);
//     //          return next(error);
//     // })
//     /*******************************/
//  };



// // const roomid=async(req,res,next)=>{
// //      const {id}=req.body;  
// //     const createdid=new Roomid({
// //        id:'1234'
// //     });
// //     try{
// //         await createdid.save();
// //       }catch(err){
// //         const error=new HttpError('connot store id',500);
// //         return next(error); 
// //       }
// //     res.status(201).json({ids:createdid.toObject({getters:true})});
// // };


// // exports.roomid=roomid;
// exports.getById=getById;
