const express=require('express');
const Admin1 = require('../controllers/global-controllers');
const routers=express.Router();

routers.post('/adminAccess',Admin1.adminReset)
module.exports=routers;
//ROUTE FOR "SEAT COUNT"  AND  "ROOM ID"