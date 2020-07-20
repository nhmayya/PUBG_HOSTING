const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    phonenumber: {type:String,unique:true,minlength:13},
    players:[{type:String,maxlength:4}],
  
});

module.exports=mongoose.model('User',userSchema);