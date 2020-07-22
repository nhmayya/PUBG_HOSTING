const HttpError=require('../models/http-error');
const User=require('../models/user');
const express = require('express');


const phonesignup=async(req,res,next)=>{
     const {phonenumber}=req.body;  
     let existingUser;
    try{
        existingUser=await User.findOne({phonenumber:phonenumber});

    }catch(err){
        const error=new HttpError('Error While Connecting',500);
        return next(error);
    }
 
    if(existingUser){
        console.log("dps1");
           // const error=new HttpError('user exit already plz login insted',422);
            //return next(error);
            const Users=existingUser;
        res.json({Users})    
    }else{
        console.log("dps2");
        const Users=new User({
            phonenumber,   
        });
        try{
            await Users.save();
        }catch(err){
            const error=new HttpError('Invalid Phonenumber Please try again',500);
            return next(error); 
        }
        console.log('user created '+Users);
        res.status(201).json({Users});
    }
};
exports.phonesignup=phonesignup;
