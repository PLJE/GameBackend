const express = require("express");
const db = require("../../database/userdb");

const router = express.Router();

router.post('/login' , (req,res)=>{ //kakao
    console.log('user kakao login');
    db.login(
        req.body.nickName,
        (result) => {
                if(result == null){
                    db.addOne(req.body.nickName, req.body.email,(result)=>{
                        res.status(200).send();
                    })
                }
        })
});

router.post('/loginapp' , (req,res)=>{
    console.log('user app login');
    db.loginapp(req.body.email, req.body.password , (result)=>{
        if(result != null){ //로그인 성공
            const objToSend = {
                nickName : result.nickName,
                email : result.email
            }
            res.status(200).send(JSON.stringify(objToSend));
        }else{
            res.status(404).send();
        }
    })
});

router.post('/signupapp' , (req,res)=>{
    console.log('user app sign up');
    db.signupapp(req.body.nickName ,(result)=>{
        if(result == null){ //회원가입 시킴
            db.addOneapp(req.body.nickName , req.body.email, req.body.password,(result)=>{
                res.status(200).send();
            })
        }else{
            res.status(400).send();
        }
    })
})

router.post('/sendscore' , (req,res)=>{
    console.log('user score receive');
       db.updateScore(req.body.nickName,req.body.score,(result)=>{
    })
})

router.get('/rankrequest' ,(req,res)=>{
    console.log('rank request');
    db.getAll((item)=>{
        //console.log(item);
        //res.json(item);
        res.send(JSON.stringify(item));
        console.log('send to app');
    });
})

router.post('/getBestScore' , (req,res)=>{
    console.log('request best score');
    db.signupapp(req.body.nickName ,(result)=>{
        if(result != null){
            const bestScore ={
                nickName : result.nickName,
                score : result.score
            }
            console.log("best score " + result.score);
            res.status(200).send(JSON.stringify(bestScore));
        }
    })
})

module.exports = router;

