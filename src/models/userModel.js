const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    nickName : String,
    email : {
        type : String,
        default : ""
    },
    password : {
        type : String,
        default : ""
    } , 
    score : {
        type : String,
        default : "0"
    }
});
const UserModel = mongoose.model("user" ,UserSchema);
module.exports = UserModel;