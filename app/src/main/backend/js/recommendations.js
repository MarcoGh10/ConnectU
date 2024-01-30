document.addEventListener('DOMContentLoaded', () => {
    const eventsList = document.querySelector('.event-cards');

    function displayEvents(events) {
        eventsList.innerHTML = '';

        if (events.length === 0) {
            const noEventsMessage = document.createElement('p');
            noEventsMessage.textContent = 'Nu sunt evenimente disponibile momentan.';
            eventsList.appendChild(noEventsMessage);
        } else {
            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('event-card');

                // Verifică dacă utilizatorul a participat deja la eveniment
                const participatedClass = event.participated ? 'participated' : '';

                eventCard.innerHTML = `
                <h3 class="event-title">${event.titlu}</h3>
                <p class="event-description">${event.descriere}</p>
                <p class="event-date">${formatDateTime(event.data)}</p> 
                <button class="join-button ${participatedClass}" onclick="joinEvent('${event.id}', this)" ${event.participated ? 'disabled' : ''}>Participă</button>
            `;

                eventsList.appendChild(eventCard);
            });
        }
    }

    function formatDateTime(dateTimeString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString('ro-RO', options);
    }

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

async function joinEvent(eventId, button) {
    try {
        if (button.disabled || button.classList.contains('participated')) {
            return;
        }

        const response = await fetch(`/join-event/${eventId}`, { method: 'POST' });
        const result = await response.json();

        if (response.ok) {
            console.log(result.message);
            // Actualizează butonul și adaugă un mesaj corespunzător
            button.textContent = 'Te-ai alaturat';
            button.classList.add('participated'); // Adaugă clasa pentru culoarea specifică
            button.disabled = true; // Dezactivează butonul după participare
        } else {
            console.error('Eroare la participarea la eveniment:', result.error);
        }
    } catch (error) {
        console.error('Eroare la participarea la eveniment:', error);
    }
}
