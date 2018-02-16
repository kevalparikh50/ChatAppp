(()=> {
    const socket = io();
    let messageList = document.querySelector('ul'),
        chatForm = document.querySelector('form'),
        nameInput = document.querySelector('.nickname'),
        chatMessage = chatForm.querySelector('.message'),
        nickName = null;



        function setNickname() {
          // debugger;
          nickName = this.value;
        }

        function handleSendMessage(e){
            e.preventDefault();// prevent default event(refresh page)


            //ternary  -> check to see if the var exists, and handle if it does, or if it dose not. true is to the left colon, false is to the right
            nickName = (nickName && nickName.length > 0) ? nickName : 'user';


            //grab the text from the input field at the bottom of the page
            msg = `${nickName} : ${chatMessage.value}`;


            // emit a chat event so we can pass it thought to the sever (and every one else)
            socket.emit('chat message', msg);
            chatMessage.value = '';
            return false;
        }

    function appendMessage(msg) {
        // debugger;
        let newMsg = `<li>${msg.message}</li>`;
        messageList.innerHTML += newMsg;
    }

    function appendDMessage(msg){
        // debugger;
        let newMsg = `<li>${msg}</li>`;
        messageList.innerHTML += newMsg;
    }


    nameInput.addEventListener('change', setNickname, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
    socket.addEventListener('chat Message', appendMessage, false);
    socket.addEventListener('disconnect message', appendDMessage, false);

})();
