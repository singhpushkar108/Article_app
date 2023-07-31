const userModel=require('./userSchema.js');
const bcrypt=require('bcrypt');
const crypto=require("crypto");
const emailValidator = require('email-validator');


//--------------------------------SIGN UP----------------------------------------------

const signUp=async(req,res,next) =>{
    
    const {name, email, password, confirmPassword,terms}= req.body;
    console.log(req.body);
    if(!name || !email || !password || !confirmPassword || !terms){
        return res.status(400).json({
            status:400,
            succes:false,
            msg:'All fields are required'
        });
    }

    const validEmail= emailValidator.validate(email); //validating email using the package email-validator

    if (!validEmail){
        
        return res.status(400).json({
            success:false,
            msg:"Invalid email"
        });
    }

    try{
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                msg:"Password and Confirm Password do not match"
            });
        }

        const userInfo= new userModel(req.body);
        const result= await userInfo.save();
        
        return res.status(200).json({
            success:true,
            data:result
            });
        
    }
    catch(error){
        if(error.code===11000){
            return res.status(400).json({
                success:false,
                msg:"user already exists"
            });
        }
        
        return res.status(400).json({
            msg:error.message
        });
    }
};

//--------------------------------------------------------------------------------------


//-------------------------------------SIGN IN--------------------------------------------

const signIn=async(req,res,next)=>{
    
    const{email,password}= req.body;
    const validEmail= emailValidator.validate(email);
    
    if(!email || !password){
        return res.status(400).json({
            status:400,
            success:false,
            msg:"all fields are required"
        });
    }
    
    if (!validEmail){
        
        return res.status(400).json({
            success:false,
            msg:"Invalid email"
        });
    }

    
    try{
        console.log(`Signin- user: ${email}, password: ${password}`)
        const user= await userModel.findOne({email}).select("+password");
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({
                success:false,
                msg:"invalid credentials"
                
            });
        }
    
        const token=user.jwtToken();//create jwt token using userSchema method(jwtToken())
        user.password=undefined;
        
        const cookieOption={
            maxAge:24*60*60*100, //24hr timeout, 
            httpOnly:true
        };
    
        res.cookie('token',token,cookieOption);
        res.status(200).json({
            success:true,
            data:user,
        });
    }
    catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
};


//------------------------------------------------------------------------------------------


//-----------------------------------------GET USER-----------------------------------------

const getUser=async(req,res,next)=>{
    const userId=req.user.id;
    
    try{
        const user = await userModel.findById(UserId);
        return res.status(200).json({
            success:true,
            data:user
        });
    }
    catch(error){
        return res.status(400).json({
            success:false});
    }
};


//------------------------------------------------------------------------------------------


//-----------------------------------------SIGN OUT-----------------------------------------

const signOut= async(req,res,next)=>{
    
    try{
        const cookieOption={
            expires:new Date(0),
            httponly: true
        };
    
        res.cookie("token",null,cookieOption);
        res.status(200).json({
            status:200,
            success:true,
            msg:'Logged out'
        });
    }
    catch(error){
        res.status(400).json({
            status:400,
            success:false,
            msg:'Something went wrong. unable to log out'
        });
    }
};




//---------------------------------------------AUTHENTICATE-------------------------------------

const auth= (req,res,next)=>{
    if (req.user){
        res.status(200).json({
            status:200,
            user: req.user,
            
        });
    }
    else{
         res.status(401).json({
            status:401,
            msg:"Access Denied"
            
        });
    }
}

module.exports = { signUp, signIn, signOut, getUser, auth };