const mongoose=require('mongoose');
const {schema}=mongoose;
const crypto=require('crypto');
const bcrypt= require('bcrypt');
const JWT= require('jsonwebtoken');

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Name is Required'],
            minLength:[5, ' Name must have >5 chars'],
            maxLength:[30,'Name must be within 30 chars'],
            trim:true
        },
        
        email:{
            type:String,
            required:[true,"Username/Email is required"],
            unique:[true, 'User already exists'],
            maxLength:[30,'Username/Email must be within 30 chars'],
            lowercase:true
        },
        
        password:{
            type:String,
            minLength:[8, ' Passwords must have >=8 chars'],
            maxLength:[30,'Name must be within 30 chars'],
            select:false
        },
        
    },
    {timestamps:true}
);

//hashing password befor saving to database
userSchema.pre('save', async function(next){
      try {
        if (!this.isModified('password')) {
          return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        return next();
      } catch (error) {
        return next(error);
      }
});

userSchema.methods={
    jwtToken(){
        return JWT.sign(
        {
            id:this._id,
            email:this.email,
            name:this.name
        },
        process.env.SECRET,
        
        {expiresIn:'24h'} );
    }
};

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;