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


socket.on('active rooms', function(activeRooms){
    
    let activeRoomsSection = document.getElementById('activeRoomsSection');

    if(activeRooms.length == 0){
        activeRoomsSection.innerHTML = '';
    }
    else{
        activeRoomsSection.innerHTML = '<h2>Active Rooms</h2>';
    }
    

    for(let i = 0; i < activeRooms.length; i++){
        activeRoomsSection.insertAdjacentHTML('beforeend', `<div class="activeRoomDiv">${activeRooms[i]}</div>`);
    }

    
    let activeRoomDiv = document.getElementsByClassName('activeRoomDiv');

    for(let i = 0; i < activeRoomDiv.length; i++){

        activeRoomDiv[i].addEventListener('click', () => {
            
            if(username.value == ''){
                alert('You must enter a username to enter this room.');
            }
            else{
                localStorage.setItem('username', JSON.stringify(username.value));
                window.location.href = window.location.href + 'chat/' + activeRoomDiv[i].innerHTML;
            }
        });
    }
});

