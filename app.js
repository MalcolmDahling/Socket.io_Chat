const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chat/:room', chatRouter);



io.on('connection', function(socket){
    console.log('User Connected.');

    socket.on('disconnect', function(){
        console.log('User Disconnected.');
    });

    socket.on('message', function(msg){
        console.log(msg);
        io.emit('message', msg)
    });
});


module.exports = {app: app, server: server};
