const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    name:{
        type:String,
        required:true
    }
});

module.exports = Result = mongoose.model('Result',ResultSchema);