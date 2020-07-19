const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    phonenumber: {type:String,required:false,unique:true,minlength:13},
    players:[{type:String,required:false,maxlength:4}]
});

module.exports=mongoose.model('User',userSchema);