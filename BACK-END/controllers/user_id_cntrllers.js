const express = require('express')
const HttpError=require('../models/http-error');
const User=require('../models/user');
const Global=require('../models/global');
const mongoose = require('mongoose');


  const getById=async(req,res,next)=>{
   const Uid=req.params.uid;
 //const {room_id,seatcount}=req.body;  
  // console.log(typeof(Uid));
   let existingId;
   try{
     existingId=await User.findById((Uid));
     console.log(existingId);
     if(!existingId||existingId.length==0){
      const error=new HttpError('user id not found',404);
      return next(error);
    }
   let Roomid
    try{
     //Roomid =await Global.find({}).select('seatcount');
     Roomid=await Global.find({},'-seatcount');
   //  console.log(Roomid);
     
    }
    catch(err){
      const error=new HttpError("fetching roomid failed plz try again"+err,500);
    return next(error);
    } //code to get room id from database
    res.json({Roomid});
   // res.json({Roomid:Roomid.map(Rid=>Rid.toObject({getters:true}))});


   }catch(err){
    const error=new HttpError("fetching uid failed plz try again"+err,500);
    return next(error);
   }

  }
  exports.getById=getById;


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

