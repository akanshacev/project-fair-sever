
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.useRegister=async(req,res) => {
    // console.log(req.body)
    const {username,password,email}=req.body
    console.log("Inside Register Function");
    console.log(req.body)
    const existingUser=await users.findOne({email})
    try{
        if(existingUser){
            res.status(401).json("User Already Exist")
        }
        else{
            const newUser=new users({
                username,password,email,profile:"",github:"",linkedin:""
            })
            await newUser.save()
            res.status(201).json(newUser)
        }
    }catch(err){
        res.status(404).json(err)
    }
    
}


exports.userLogin=async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
        
            const token=jwt.sign({email:existingUser.email,username:existingUser.username,userId:existingUser._id},process.env.secret_key)
            const rest={token,username:existingUser.username,userDetails:existingUser}
            console.log(rest);
            console.log(token);
            res.status(200).json(rest)
        }
        else{
            res.status(406).json("invalis Username/Password!!")
        }
    }
    catch(err){
        console.log(err);
        res.status(401).json(err)
    }
}

exports.userUpdateProfile = async (req,res)=>{
    const userId=req.payload
    const {username,password,email,github,linkdin,profile}=req.body
    const profileImage=req.file?req.file.filename:profile

    try{
        const updateUser= await users.findByIdAndUpdate({_id:userId},{username,password,email,github,linkedin:linkdin,profile:profileImage},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch(err){
        console.log(err)
        res.status(406).json(err)
    }
}