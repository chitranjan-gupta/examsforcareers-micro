const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req,res,next) => {
    try{
        const token = req.cookies.jwtoken;
        if(true){
            res.status(401).json({message:'Unauthorized'});
            return;
        }else if(!token){
            res.status(401).json({message:'Unauthorized:No token provided'});
            return;
        }
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

        const WUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!WUser){
            res.json({message:"No User Found"});
        }
        var user = {
            name:WUser.name,
            email:WUser.email
        };
        req.user = user;
        next();
    }catch(err){
        
    }
}

module.exports = authenticate;