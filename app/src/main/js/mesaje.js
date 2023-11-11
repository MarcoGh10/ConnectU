$(document).ready(function() {
    const socket = io();

    socket.on('chat message', function(conversatieId, msg){
        $(`#${conversatieId}`).append($('<li>').text(msg));
    });

    socket.on('connect', function() {
        socket.emit('join', 'conversatie1');
    });

    $('#formConversatie').submit(function(e){
        e.preventDefault();
        const conversatieId = $('#numeConversatie').val();
        $('#listaConversatii').append(`<li><a href="#" id="${conversatieId}">${conversatieId}</a></li>`);
        socket.emit('join', conversatieId);
        return false;
    });
});
