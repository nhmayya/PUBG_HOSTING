const mongoose = require('mongoose')
const roomid = new mongoose.Schema({
    id : {
        default : null,
        type : String
    }
})

roomid=mongoose.model('roomid',roomid);
module.exports = roomid