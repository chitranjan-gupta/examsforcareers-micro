const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdmitSchema = new Schema({
    name:{
        type:String,
        required:true
    }
});

module.exports = Admit = mongoose.model('Admit',AdmitSchema);