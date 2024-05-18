const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDb atlas Connected Successfull!!");
}).catch((err)=>{
    console.log("MongoDb Connection Failed");
    console.log(err);
})