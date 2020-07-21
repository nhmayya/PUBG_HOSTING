const express=require('express');
const usersControllers=require('../controllers/login-controllers');
const routers=express.Router();

 
   routers.post('/',usersControllers.phonesignup);
   //routers.post('/login',);
module.exports=routers;
