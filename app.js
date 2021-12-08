const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');  // import mongoose랑 같은 의미이다.
const config = require('./config/database')


const app = express(); // app이라는 express객체 생성
const users = require('./routes/users')
//port number
const port=process.env.PORT||3000; //컴퓨터에서 제공하는 PORT번호를 쓸지 없으면 3000사용
// const port=3000;


/* 
* DB Conneted 
*/
//Connect to database
mongoose.connect(config.database)
// on Connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database'+config.database)
})
//on error
mongoose.connection.on('error',(err)=>{
    console.log('database error'+err)
})







//start server
app.listen(port,function(){
    console.log("server started on port " + port);
});
/*  익명 함수 es6 표기방법
app.listen(port, ()=>{
    console.log("Server started on port " + port);
});

       두번째 방법
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
*/



/* PORT
 * mongodb : 27017
 * web port : 80인데 3000으로 지정
 */




/*
 * app.use() //사용자가 요청시 무조건 실행되는 부분.
 * 서버 시작과 동시에 시작된다고 생각하면 편하다.
 */
app.use(cors()); //사용자가 요청하면 무조건 실행되는 부분.
app.use(express.json());        // JSON활용을 위한 미들웨어
app.use(express.urlencoded({extended:true}));  //URL 인코딩된 데이터의 활용을 위한 미들웨어
app.use(express.static(path.join(__dirname,'public'))); //정적페이지 설정

/**
 * PASSPORT미들웨어 추가
 */
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

app.use('/users',users); //라우팅 설정 라우팅 설정은 항상 맨 마지막에 express.json, express.urlencode보다 뒤에 있어야 한다.




/*
 * app.get보다 use가 권한이 높기때문에 index.html의 경우 public에 있는 index가 먼저 실행된다.
 */

app.get('/',(req,res)=>{
    res.send('<h1>서비스 준비중입니다...</h1>');
});

app.get('/eng',(req,res)=>{
    res.send('server eng under con.....');
});