const mongoose = require('mongoose')
const roomid = new mongoose.Schema({
    id : {
       // default : null,
        type : String
    }
})
module.exports=mongoose.model('Room',roomid);
