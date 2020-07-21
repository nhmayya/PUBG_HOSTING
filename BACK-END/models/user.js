const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    phonenumber: {type:String,unique:true,minlength:13},
    players:[{type:String}],
  
});

module.exports=mongoose.model('User',userSchema);