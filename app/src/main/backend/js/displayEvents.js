document.addEventListener('DOMContentLoaded', () => {
    const eventsList = document.getElementById('eventsList');
    const joinedEventsList = document.getElementById('joinedEventsList');

    function displayEvents(events, container) {
        container.innerHTML = '';

        if (events.length === 0) {
            const noEventsMessage = document.createElement('p');
            noEventsMessage.textContent = 'Nu sunt evenimente disponibile momentan.';
            container.appendChild(noEventsMessage);
        } else {
            events.forEach(event => {
                const eventCard = createEventCard(event);
                container.appendChild(eventCard);
            });
        }
    }

    function createEventCard(event) {
        const eventCard = document.createElement('li');
        eventCard.classList.add('event-card');

        eventCard.innerHTML = `
            <h3 class="event-title">${event.titlu}</h3>
            <p class="event-description">${event.descriere}</p>
            <p class="event-datetime">${formatDateTime(event.data_eveniment)}</p>
            <button class="join-button" onclick="joinEvent('${event.id}', this)">Participă</button>
        `;
        return eventCard;
    }

    function formatDateTime(dateTimeString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString('ro-RO', options);
    }

    // Funcție pentru a obține evenimentele recomandate de la server
    function fetchRecommendedEvents() {
        fetch('/recommended-events')
            .then(response => response.json())
            .then(data => {
                displayEvents(data, eventsList); // Afișează evenimentele disponibile
            })
            .catch(error => {
                console.error('Eroare la obținerea evenimentelor disponibile:', error);
            });
    }

    // Funcție pentru a obține evenimentele la care participă utilizatorul
    function fetchJoinedEvents() {
        fetch('/joined-events')
            .then(response => response.json())
            .then(data => {
                displayEvents(data, joinedEventsList); // Afișează evenimentele la care participă utilizatorul
            })
            .catch(error => {
                console.error('Eroare la obținerea evenimentelor la care participă utilizatorul:', error);
            });
    }

    fetchRecommendedEvents();
    fetchJoinedEvents();
});
