/**
 * 사용자 스키마 생성 페이지
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const config = require('../config/database')

const UserSchema = mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cert: {
        type: String,
        required: false,
        },
});

/**  */
const User=mongoose.model('User',UserSchema) //모델안의 User는 웹에서 사용하는 이름 collection 이름


User.saveCert = function (username, cert, callback) {
    const query = { username: username };
    const update = { cert: cert };
    User.findOneAndUpdate(
    query,
    update,
    { new: true, useFindAndModify: false },
    callback
    );
};

User.getUserById=function(id,callback){
    User.findById(id,callback);
}

User.getUserByName=function(username,callback){
    const query={username:username};
    User.findOne(query,callback);
}

User.addUser=function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback); //callback사용 이유? 세이브가 끝나야 다음 로직이 가능하게 하기위해?
        })
    })
}

User.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch)
    });
}

User.getAll = function (callback) {
    User.find(callback);
    };

module.exports=User;


//module.exports, callback함수?, bcrypt, 미들웨어, salt?, 기본 collection이 users?