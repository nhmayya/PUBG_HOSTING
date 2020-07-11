const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    phonenumber: {type:String,required:true,unique:true,minlength:13},
});
module.exports=mongoose.model('User',userSchema);