const mongoose=require('mongoose')

const ownerUserSchema=new mongoose.Schema({
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
        enum:["owner"],
        default:"owner"
    },
     profile:{
        type:String,
        default:""
    }
},{timestamps:true})

const ownerUser=mongoose.model("ownerUser",ownerUserSchema)
module.exports=ownerUser