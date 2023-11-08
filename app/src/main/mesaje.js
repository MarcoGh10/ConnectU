document.addEventListener('DOMContentLoaded', function () {
    const chat = document.getElementById('chat');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send');
    
    sendButton.addEventListener('click', function () {
        const messageText = messageInput.value;
        // Trimite mesajul către server și afișează-l în chat
        chat.innerHTML += `<div class="message">Eu: ${messageText}</div>`;
        messageInput.value = '';
    });
});
