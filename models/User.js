const mongoose = require('mongoose');
const bycrpt = require('bcrypt-nodejs');

// ----------------------- make new schema for the model -----------------------

var schema = new mongoose.Schema({
	firstname:{type : String},
	lastname:{type : String},
	email:{type : String},
	password:{type : String},
	date:{type:String,default:Date.now}
});
//-----------------------------------bycrpt password ---------------------------
schema.methods.encryptpass = function (password) {
	return bycrpt.hashSync(password,bycrpt.genSaltSync(10),null);
}

//--------------------------------- compare password with the hash ----------------
schema.methods.validpassword = function(password){
	return bycrpt.compareSync(password, this.password);

}

//----------------------------------create the model ---------------------------
var User = mongoose.model('users',schema);
module.exports={User};
