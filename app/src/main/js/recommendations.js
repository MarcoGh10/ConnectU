document.addEventListener('DOMContentLoaded', function () {
    // Simulăm datele de recomandări (într-un scenariu real, aceste date ar veni din server)
    const recommendedGroups = ['Grup1', 'Grup2', 'Grup3'];
    const recommendedForums = ['Forum1', 'Forum2', 'Forum3'];

    // Afișează recomandările în HTML
    const recommendedGroupsList = document.getElementById('recommendedGroups');
    const recommendedForumsList = document.getElementById('recommendedForums');

    recommendedGroups.forEach(group => {
        const li = document.createElement('li');
        li.textContent = group;
        recommendedGroupsList.appendChild(li);
    });

    recommendedForums.forEach(forum => {
        const li = document.createElement('li');
        li.textContent = forum;
        recommendedForumsList.appendChild(li);
    });
});
