const express = require('express');
const SocketServer = require('websocket').server //
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/user');


const dbURL = 'mongodb://localhost:27017/project2'

var app = express();

//mongodb 연결 및 설정
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', function(){
    console.log('Connection Failed!');
});
db.once('open', function() {
    console.log('DB Connected!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('port', process.env.PORT || 80);

app.get('/', (req, res) => {
    res.status(418).send("2nd Project");
});

//router 연결
app.use('/user', userRouter);

// Express 서버 시작
const server = http.createServer(app).listen(app.get('port'), function(){
    console.log(app.get('port') + "에서 express 실행 중");
});


wsServer = new SocketServer({httpServer:server}); //
const connections = []

wsServer.on('request', (req) => {
  const connection = req.accept()
  console.log('new connection')
  connections.push(connection)

  connection.on('message', (mes) => {
      connections.forEach(element => {
          if (element != connection)
              element.sendUTF(mes.utf8Data)
      })
  })

  connection.on('close', (resCode, des) => {
      console.log('connection closed')
      connections.splice(connections.indexOf(connection), 1)
  })

})


