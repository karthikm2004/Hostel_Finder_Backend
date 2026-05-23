const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
     username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","owner","admin"],
        default:"user"
    },
     profile:{
        type:String,
        default:""
    },
    favorites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hostel"
    }]
},{timestamps:true})

const users=mongoose.model("users",userSchema)
module.exports=users