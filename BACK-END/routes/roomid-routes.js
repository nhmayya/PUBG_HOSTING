const express=require('express');
const roomControllers=require('../controllers/roomid-controllers');
const routers=express.Router();

routers.get('/',roomControllers.getById)
//routers.post('/rid',roomControllers.roomid);
   
module.exports=routers;
