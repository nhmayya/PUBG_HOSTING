const mongoose = require('mongoose')
const roomid = new mongoose.Schema({
    id : {
       // default : null,
        type : String
    }
})

//roomid=mongoose.model('Roomid',roomid);
//module.exports = roomid

module.exports=mongoose.model('Room',roomid);


// const mongoose=require('mongoose');
// const userSchema=new mongoose.Schema({
//     phonenumber: {type:String,required:true,unique:true,minlength:13},
// });
// module.exports=mongoose.model('User',userSchema);