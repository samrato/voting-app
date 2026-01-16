const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const voterModel = require("../models/voterModel");
const HttpError=require("../models/voterModel")

// <!-------------REGISTER NEW VOTER -----------!>
// ====== POST :api/voters/register
// unprotected
const registerVoter= async(req,res,next)=>{
    try {
        const{fullName,email,password,password2}=req.body;
        if(!fullName || !email || !password || !password2){
            return next(new HttpError("Fill in all Field",422))
        }
        // make all emails lowercase 
        const newEmail=email.toLowerCase()
        // check email already in DB
        const emailExist=await voterModel.findOne({email:newEmail})
        if(emailExist){return next(new HttpError("Email Already exist ",422))}
        // make sure password is six characters 
        if((password.trim().length)<6){return next(new HttpError("Password should be atleast 6 characters",422))}
        // make sure password and confirm pass are same
        if(password != password2){return next(new HttpError("Password do not match",422))}
        // hash password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt)
        // me only to be the admin"onyangojuma984@gmail.com
        let isAdmin=false;
        if(newEmail=="onyangojuma984@gmail.com"){isAdmin=true}
        // save new voter to the Db
        await voterModel.create({fullName,email:newEmail,password:hashedPassword,isAdmin}) 
        res.status(201).json(`New voter ${fullName} created`)

    } catch {
        return next(new HttpError("Voter Registration failed",422))
        
    }
}


// functions to generate Tockens 
const generateTocken=(payload)=>{ 
    const token =jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"})
    return token;
}
 
// ============== LOGIN VOTER  ===================
//==========POST :api/voters/login
// unprotected
const loginVoter= async(req,res,next)=>{
    try {
        const{email,password}=req.body 
        if(!email ||!password){return next (new HttpError("Fill in all Fields",422))}
         // make all emails lowercase 
         const newEmail=email.toLowerCase()
         const voter = await voterModel.findOne({email:newEmail})
         if(!voter){return next(new HttpError("Invali credentials"))}
         // compare passwords  
         const comparePass =await bcrypt.compare(password,voter.password)
         
         if(!comparePass){return next(new HttpError("Invalid credentials",422))}
        const {id:id,isAdmin,votedElections}=voter  
        const token=generateTocken({id,isAdmin})

        res.json({token,id,votedElections,isAdmin})
    } catch {
        return next (new HttpError("Login Failed pleasee check your credentials or try again later ",422))
        
    }
}

// ================ GET VOTER===================== 
//========== POST : api/voters/:id
// protected
const getVoter= async(req,res,next)=>{
    try {
        const{id}=req.params;
        const voter = await voterModel.findById(id).select("-password")
        res.json(voter)
    } catch {
        return next(new HttpError("Could not get the voter ",422))
    }
}


const getCurrentVoter = async (req, res, next) => {
    try {
        const { id } = req.user;
        const voter = await voterModel.findById(id).select("-password");
        res.json(voter);
    } catch {
        return next(new HttpError("Could not get the voter ", 422));
    }
};




module.exports={registerVoter,loginVoter,getVoter, getCurrentVoter};