const JWT=require('jsonwebtoken');

//router level middleware function
const jwtAuth=(req,res,next)=>{
    
    const token = (req.cookies && req.cookies.token) || null; //getting the token from the request cookies
    
    if(!token){
        //if the token from the requested cookies are not present or null
        return res.status(400).json({
            success:false,
            msg:"Not Authorized"
        });
    }
    
    try{
        //If a token is present in the request cookies, the middleware proceeds to verify the token using JWT.verify
        const payload=JWT.verify(token,process.env.SECRET);//verifying the token's authenticity and extract the payload.
        
        req.user={
                    id:payload.id,
                    email:payload.email,
                    name:payload.name
        };
    }
    catch(error){
        return res.status(400).json({success:false, msg:"Your are not a registered user"});
    }
    next();
};

module.exports={jwtAuth};