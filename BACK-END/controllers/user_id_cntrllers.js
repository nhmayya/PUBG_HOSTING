const express = require('express')
const HttpError=require('../models/http-error');
const User=require('../models/user');
const Global=require('../models/global');
const mongoose = require('mongoose');


  const getById=async(req,res,next)=>{
   const Uid=req.params.uid;
   let existingId;
   try{
     existingId=await User.findById((Uid));
     console.log(existingId);
     if(!existingId||existingId.length==0){
      const error=new HttpError('User Not Found',404);
      return next(error);
    }
   let Roomid
    try{
     //Roomid =await Global.find({}).select('seatcount');
     Roomid=await Global.find({},'-seatcount');
   //  console.log(Roomid);
     
    }
    catch(err){
      const error=new HttpError("Error While Connecting",500);
    return next(error);
    } //code to get room id from database
    res.json({Roomid});
   // res.json({Roomid:Roomid.map(Rid=>Rid.toObject({getters:true}))});


   }catch(err){
    const error=new HttpError("Error While Connecting",500);
    return next(error);
   }

  }
  exports.getById=getById;



