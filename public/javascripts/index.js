const socket = io();

form = document.getElementById('form');
username = document.getElementById('username');
chatroom = document.getElementById('chatroom');


form.addEventListener('submit', (e) => {

    e.preventDefault();

    if(username.value != '' && chatroom.value != ''){

        let user = {
            username: username.value,
            chatroom: chatroom.value
        };
    
        localStorage.setItem('user', JSON.stringify(user));
    
        window.location.href = window.location.href + 'chat/' + chatroom.value;
    }

});

