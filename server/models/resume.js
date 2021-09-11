const mongoose = require('mongoose')
const Schema = mongoose.Schema;


var cvSchema = new Schema({}, {strict : false});
var Cv = mongoose.model('cv', cvSchema)

module.exports=Cv;

