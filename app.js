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

    console.log('User Connected');


    socket.on('join', function(room){
        socket.join(room);
        console.log('User connected to room: ' + room);

        console.log(getActiveRooms(io));
    });


    socket.on('disconnect', function(){
        console.log('User Disconnected');
    });


    socket.on('message', function(msg){
        console.log(msg);
        io.to(msg.room).emit('message', msg)
    });


    socket.on('isTyping', function(isTyping){
        io.to(isTyping.room).emit('isTyping', isTyping);
    });

});


function getActiveRooms(io) {
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(io.sockets.adapter.rooms);
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter(room => !room[1].has(room[0]))
    // Return only the room name: 
    // ==> ['room1', 'room2']
    const res = filtered.map(i => i[0]);
    return res;
}


module.exports = {app: app, server: server};
