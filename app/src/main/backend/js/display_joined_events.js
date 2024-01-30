// Funcție pentru a afișa evenimentele la care utilizatorul a dat "join"
function displayJoinedEvents(joinedEvents) {
    const noEventsMessage = document.getElementById('no-events-message');
    const joinedEventsList = document.getElementById('joined-events-list');

    if (joinedEvents.length === 0) {
        noEventsMessage.style.display = 'block'; // Afișează mesajul dacă nu există evenimente
        joinedEventsList.style.display = 'none'; // Ascunde lista de evenimente
    } else {
        noEventsMessage.style.display = 'none'; // Ascunde mesajul dacă există evenimente
        joinedEventsList.style.display = 'block'; // Afișează lista de evenimente

        joinedEventsList.innerHTML = '';

        joinedEvents.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.textContent = `${event.title} - ${event.date}`; // Afișăm titlul și data evenimentului
            joinedEventsList.appendChild(eventItem);
        });
    }
}
