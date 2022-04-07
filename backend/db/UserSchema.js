const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    lname:{type:String,required:true},
    uname:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})
module.exports=mongoose.model("users",userSchema)