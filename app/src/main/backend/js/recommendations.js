document.addEventListener('DOMContentLoaded', () => {
    const eventsList = document.querySelector('.event-cards');

    // Funcție pentru a afișa evenimentele pe pagină
    function displayEvents(events) {
        eventsList.innerHTML = ''; // Curățăm lista de evenimente existente

        events.forEach((event, index) => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <button class="join-button" onclick="joinEvent('${event.id}')">Participă</button>
            `;
            eventsList.appendChild(eventCard);
        });
    }

    // Funcție pentru a obține evenimentele recomandate de la server
    function fetchRecommendedEvents() {
        fetch('/recommended-events')
            .then(response => response.json())
            .then(data => {
                displayEvents(data); // Afișează evenimentele pe pagină
            })
            .catch(error => {
                console.error('Eroare la obținerea evenimentelor:', error);
            });
    }

    fetchRecommendedEvents();
});

function joinEvent(eventId) {
    console.log(`Te-ai alăturat evenimentului cu ID-ul ${eventId}`);
}
