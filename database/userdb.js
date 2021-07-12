const UserModel = require('../src/models/userModel');

function login(pnickName, callback){
    const query={
        nickName : pnickName,
    }
    UserModel.findOne(query, (err,result)=>{
        callback(result);
    });
}

function addOne(pnickName, pemail , callback){
    const newUser = new UserModel({
        nickName : pnickName,
        email : pemail
    });
    newUser.save((err,item)=>{
        callback(item);
    })
}

function loginapp(pemail ,ppassword, callback){
    const query = {
        email : pemail,
        password : ppassword
    }
    UserModel.findOne(query , (err,result)=>{
        callback(result);
    })
}

function signupapp(pnickName ,callback){
    const query ={
        nickName : pnickName
    }
    UserModel.findOne(query,(err,result)=>{
        callback(result);
    })
}

function addOneapp(pnickName, pemail ,ppassword , callback){
    const newUser = new UserModel({
        nickName : pnickName,
        email : pemail,
        password: ppassword
    });
    newUser.save((err,item)=>{
        callback(item);
    })
}

function updateScore(pnickName ,pscore , callback){
    const query ={
        nickName : pnickName
    }
    console.log(pnickName);
    UserModel.findOne(query,(err,result)=>{
        if(result != null){
            if(Number(result.score) < Number(pscore)){
                console.log('최고점수 갱신 :' + pscore);
                result.score = pscore;
                result.save((err,item)=>{

                })
            }
        }
    })
}

function getAll(callback){
    console.log('getAll start')
    UserModel.find({} , (error,result)=>{
        console.log('getAll find');
        callback(result);
    })
}


module.exports = {
    login,
    addOne,
    loginapp,
    signupapp,
    addOneapp,
    updateScore,
    getAll
}
