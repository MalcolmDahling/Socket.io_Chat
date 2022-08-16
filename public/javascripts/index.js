const socket = io();

form = document.getElementById('form');
username = document.getElementById('username');
chatroom = document.getElementById('chatroom');


form.addEventListener('submit', (e) => {

    e.preventDefault();

    if(username.value != '' && chatroom.value != ''){

        localStorage.setItem('username', JSON.stringify(username.value));
    
        window.location.href = window.location.href + 'chat/' + chatroom.value;
    }

});


socket.on('open rooms', function(openRooms){
    console.log(openRooms);
})