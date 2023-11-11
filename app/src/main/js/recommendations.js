document.addEventListener('DOMContentLoaded', function () {
    // Simulăm datele de recomandări (într-un scenariu real, aceste date ar veni din server)
    const recommendedGroups = ['Grup1', 'Grup2', 'Grup3'];
    const recommendedForums = ['Forum1', 'Forum2', 'Forum3'];

    // Afișează recomandările în HTML
    const recommendedGroupsList = document.getElementById('recommendedGroups');
    const recommendedForumsList = document.getElementById('recommendedForums');
    
    // recommendations.js (sau numele fișierului tău JavaScript)
function joinGroup(groupName) {
    // Adaugă aici logica pentru a adera la grup
    alert('Te-ai alăturat grupului ' + groupName);
}

function joinForum(forumName) {
    // Adaugă aici logica pentru a adera la forum
    alert('Te-ai alăturat forumului ' + forumName);
}

});
