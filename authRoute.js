const express = require('express');
const router = express.Router();
const {jwtAuth}=require('./jwtAuth.js');

const {signUp,signIn,signOut,getUser,auth} = require ('./controller.js');


router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/user',jwtAuth,getUser);
router.post('/signout',signOut);

router.post('/authenticate',jwtAuth,auth);

module.exports=router;