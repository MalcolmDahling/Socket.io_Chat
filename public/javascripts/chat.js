const socket = io();

chat = document.getElementById('chat');
form = document.getElementById('form');
input = document.getElementById('input');

let room = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);


document.getElementById('title').innerHTML = 'You are currently chatting in room: ' + decodeURIComponent(room);

let username = JSON.parse(localStorage.getItem('username'));


form.addEventListener('submit', function(e){
    e.preventDefault();

    if(input.value){
        socket.emit('message', {room: room, text: input.value, username: username})
        input.value = '';
    }

});



socket.on('message', function(msg){

    if(msg.room == room){
        chat.insertAdjacentHTML('beforeend', '<p><b>' + msg.username + ': </b>' + msg.text + '</p>');
    }
    
    chat.scrollTop = chat.scrollHeight;
});
