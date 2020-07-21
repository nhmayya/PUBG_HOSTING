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
     // return console.log(" doesnt exists in DB !!")
     const error=new HttpError('User NOt Found '+err,404);
     return next(error);

    }
    if(phoneBody === phoneDB){
       // console.log("Success ! have to send the response")
        
        const seatCount = await Global.distinct('seatcount',{})
        console.log('guu',seatCount)
        seatcountnew = seatCount - playersBody.length
        
        let globalid 
        try {
             globalid = await Global.distinct('_id',{})            
        } catch (err) {
           // console.log(error)
           const error=new HttpError('Error While Connecting',500);
           return next(error);
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

        } catch (err) { 
            const error=new HttpError('Error While Connecting'+err,500);
           return next(error);
        }
        } catch (err) {
            const error=new HttpError('Error While Connecting',500);
           return next(error);
            
        }
    }

} catch (err) {
    const error=new HttpError('Error While Connecting',500);
    return next(error);
}
}

const seatcount = async (req,res,next)=>{
    const {_id} = req.params.uid
    console.log(_id)
    try {
        const userFromDB = await User.findById(_id)
        if(!userFromDB) {
          // return console.log("id not found")
          const error=new HttpError('User Not Found',404);
          return next(error);
        }
        try {
            globalid = await Global.distinct('_id',{})
            const { _id : uidDB,} = userFromDB
            if(_id == uidDB){
                const seatCount = await Global.distinct('seatcount',{})
                console.log(seatCount)
            }
        } catch (err) {
            const error=new HttpError('Error While Connecting',500);
            return next(error);
        }
    } catch (err) {
        const error=new HttpError('Error While Connecting',500);
        return next(error);
    }
   
}

exports.Register = Register
exports.seatcount = seatcount
