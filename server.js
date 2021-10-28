var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
var Message = mongoose.model('Message',{
  name : String,
  message : String
})

require("dotenv").config();

const db = process.env.DB_URL

const dbUrl = db


app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
     var message = new Message(req.body);
        message.save((err) =>{
             if(err)
                sendStatus(500);
                io.emit('message', req.body);
                res.sendStatus(200);
              })
})





io.on('connection', () =>{
  console.log(' Um Usuário se conectou !!')
})
mongoose.connect(dbUrl , (err) => { 
    console.log(`Conectando MongoDB em ${dbUrl}`,err);
 })
var server = http.listen(3000, () => {
  console.log('server running', server.address().port);
});
