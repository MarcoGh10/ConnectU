document.addEventListener('DOMContentLoaded', () => {
    const joinedEventsList = document.getElementById('joined-events-list');

    // Funcție pentru a afișa evenimentele la care utilizatorul a dat "join"
    function displayJoinedEvents(joinedEvents) {
        joinedEventsList.innerHTML = ''; // Curățăm lista de evenimente la care s-a alăturat utilizatorul

        joinedEvents.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.textContent = `${event.title} - ${event.date}`; // Afișăm titlul și data evenimentului

            joinedEventsList.appendChild(eventItem);
        });
    }
    const userJoinedEvents = [
        { title: 'Nume Eveniment 1', date: '25 noiembrie 2023' },
        { title: 'Nume Eveniment 2', date: '28 noiembrie 2023' },
        // Adăugați alte evenimente la care utilizatorul a dat "join"
    ];

    displayJoinedEvents(userJoinedEvents);
});
