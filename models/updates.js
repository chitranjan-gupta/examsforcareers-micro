const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    intro:{
        type:String,
        required:true
    },
    fee:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    req:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
});

module.exports = Update = mongoose.model('Update',UpdateSchema);