const express=require('express');
const UserRegister = require('../controllers/user-registration-controllers');
const routers=express.Router();
routers.get('/:uid/SEAT',UserRegister.seatcount)
routers.post('/',UserRegister.Register)

   
module.exports=routers;