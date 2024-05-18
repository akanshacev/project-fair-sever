const jwt=require('jsonwebtoken')

const jwtMiddlewareFun=(req,res,next)=>{
    console.log("Inside jwxMiddleware");
    try{
        const token=req.headers.authorization.split(" ")[1]
        if(token){
            const result=jwt.verify(token,process.env.secret_key)
            console.log(result);
            req.payload=result.userId
            next()
        }
        else{
            res.status(406).json("Please Login First")
        }
    }
    catch{
        res.status(406).json("Login First")
    }
   
   
}

module.exports=jwtMiddlewareFun