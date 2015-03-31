/**
 * New node file
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
 
var userSchema = new Schema({
  username: String,
  password: String,
  creationDate: Date
});
 
module.exports = mongoose.model('User', userSchema);
