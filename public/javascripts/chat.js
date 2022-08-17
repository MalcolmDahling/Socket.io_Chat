const socket = io();

chat = document.getElementById('chat');
form = document.getElementById('form');
input = document.getElementById('input');

let room = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
let username = JSON.parse(localStorage.getItem('username'));

socket.emit('join', room);

document.getElementById('title').innerHTML = 'Chatroom: ' + decodeURIComponent(room);




form.addEventListener('submit', function(e){
    e.preventDefault();

    if(input.value){
        socket.emit('message', {room: room, text: input.value, username: username})
        input.value = '';

        socket.emit('isTyping', {username: username, room: room, empty: true});
    }

});



socket.on('message', function(msg){

    if(msg.username == username){
        chat.insertAdjacentHTML('beforeend', '<p><b><span class="ownMessage">' + msg.username + ':</span> </b>' + msg.text + '</p>');
    }

    else{
        chat.insertAdjacentHTML('beforeend', '<p><b>' + msg.username + ': </b>' + msg.text + '</p>');
    }
         
    chat.scrollTop = chat.scrollHeight;

});






//is typing
input.addEventListener('input', event => {
    
    if(input.value != ''){
        socket.emit('isTyping', {username: username, room: room, empty: false});
    }

    else{
        socket.emit('isTyping', {username: username, room: room, empty: true});
    }

});



let usersWhoAreTyping = [];

socket.on('isTyping', function(isTyping){

    if(isTyping.username != username){ //if it isnt yourself who are typing
        

        if(isTyping.empty == true){
            usersWhoAreTyping = usersWhoAreTyping.filter(function(e) { return e !== isTyping.username });
        }
        else if(usersWhoAreTyping.includes(isTyping.username) == false){
            usersWhoAreTyping.push(isTyping.username);
        }



        if(usersWhoAreTyping.length == 0){
            document.getElementById('isTyping').style.visibility = 'hidden';
        }
        else{
            document.getElementById('isTyping').style.visibility = 'visible';
        }


        let isTypingSpan = document.getElementById('isTypingSpan');

        isTypingSpan.innerHTML = '';


        for(let i = 0; i < usersWhoAreTyping.length; i++){
            isTypingSpan.insertAdjacentHTML('beforeend', usersWhoAreTyping[i] + ', ');
        }


        isTypingSpan.innerText = isTypingSpan.innerText.slice(0, -2); //remove last comma and space
        
    }
});

