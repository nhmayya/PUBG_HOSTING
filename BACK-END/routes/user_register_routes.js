const express=require('express');
const usersControllers=require('../controllers/user_register_cntrollers');
const routers=express.Router();

 
   routers.post('/phonesignup',usersControllers.phonesignup);
   //routers.post('/login',);
module.exports=routers;
