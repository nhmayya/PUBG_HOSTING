const express=require('express');
const usersControllers=require('../controllers/users-controllers');
const routers=express.Router();

 
   routers.post('/phonesignup',usersControllers.phonesignup);
   //routers.post('/login',);
module.exports=routers;
