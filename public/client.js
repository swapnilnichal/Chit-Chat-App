const socket = io();
let name;

let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do{
    name = prompt('Enter Your Name');
}while(!name)

textArea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        const inputValue = e.target.value.trim();
        if(inputValue !== ''){
          sendMessage(e.target.value);
        }
    }
})

function sendMessage(message){
   let msg = {
      user : name ,
      message : message.trim()
   }
   appendMessage(msg,'outgoing');
   textArea.value = ' ';
   scrollToBottom();
   //send this message to server also using socket
   socket.emit('message',msg);
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type ;
    mainDiv.classList.add(className,'message');
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

 //receive message from a server 
 socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom();
 })

 function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight ;
 }