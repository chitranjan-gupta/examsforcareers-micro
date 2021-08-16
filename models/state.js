const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    name:{
        type:String,
        required:true
    }
});

module.exports = State = mongoose.model('State',StateSchema);