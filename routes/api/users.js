const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../../middleware/authenticate');
const User = require('../../models/user');

router.get('/', (req,res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
})

router.post('/register', async (req,res) => {

    const user = await User.findOne({ email: req.body.email});

    if(user){
        res.status(422).json({message:"Email Already Exists"});
    }
    else{
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            cemail:req.body.cemail,
            phone:req.body.phone,
            cphone:req.body.cphone,
            password:req.body.password,
            cpassword:req.body.cpassword
        });
        const newuser = await newUser.save();
        res.json({message:"Registered"});
    }
})

router.post('/signin', async(req,res) => {
    let token;
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({error:'Empty'});
    }

    const userLogin = await User.findOne({ email:email });

    if(userLogin){
        const isMatch = await bcrypt.compare(password,userLogin.password);
        token = await userLogin.generateAuthToken();
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now() + 25892000000),
            httpOnly:true
        });
        if(!isMatch){
            res.status(400).json({ error: "Invalid Password"});
        }else{
            res.json({message:"User Signin successfully"});
        }
    }else{
        res.status(400).json({error:"Invalid Username"});
    }
})

router.delete('/:id', (req,res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success:false}))
})

router.get('/user',authenticate,(req,res) => {
    res.json(req.user);
})

router.get('/signout', (req,res) =>{
   res.clearCookie('jwtoken',{ path:'/' });
   res.status(200).send('User Logout'); 
});

module.exports = router;