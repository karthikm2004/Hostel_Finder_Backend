const mongoose=require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING).then((res)=>{
    console.log("Server Concted to MongoDB");
    
}).catch(err=>{
    console.log(err);
    
})