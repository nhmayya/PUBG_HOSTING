const express = require('express')
const HttpError=require('../models/http-error');
const Global=require('../models/global');
const mongoose = require('mongoose');

const adminReset = async(req,res,next)=>{
    room_id = new Global(req.body)
    console.log(room_id)
    try {
        await room_id.save()
    } catch (error) {
        console.log(error, "unavle to save room id")
    }

}

exports.adminReset =adminReset





//CONTROLLER FOR "SEAT COUNT"  AND  "ROOM ID"

// second get here
//seat count