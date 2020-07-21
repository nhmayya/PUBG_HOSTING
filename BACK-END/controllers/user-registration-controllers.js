const express = require('express')
const HttpError=require('../models/http-error');
const User=require('../models/user');
const Global=require('../models/global');
const mongoose = require('mongoose');

const Register = async(req,res,next)=>{
 const {phonenumber: phoneBody, players : playersBody, uid : uidBody} = req.body
 

try {
    const userFromDB = await User.findById(uidBody)
    
    const { phonenumber : phoneDB, _id : uidDB,players : playersDB} = userFromDB
    if(!userFromDB){
      return console.log(" doesnt exists in DB !!")
    }
    if(phoneBody === phoneDB){
        console.log("Success ! have to send the response")
        
        const seatCount = await Global.distinct('seatcount',{})
        seatcountnew = seatCount - playersBody.length
        
        let globalid 
        try {
             globalid = await Global.distinct('_id',{})            
        } catch (error) {
            console.log(error)
        }
        try {
           const temp =  await Global.findById(globalid)
           temp.seatcount = seatcountnew   
           try {
            await temp.save()
            console.log("saved")
            //saving user
            userFromDB.players = playersBody
            await userFromDB.save()

        } catch (error) { 
        }
        } catch (error) {
            
        }
    }

} catch (e) {
    const error=new HttpError(e , "couldnt connect to DB (while registering)",500);
    return next(error);
}
}

exports.Register = Register
