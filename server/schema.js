const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dsSchema = new Schema({
    title : String,
    description : String,
    created_on : {type : Date, default : Date.now}
});

const dsModel = mongoose.model('Post', dsSchema);

module.exports = dsModel;