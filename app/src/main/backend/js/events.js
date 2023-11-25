document.addEventListener('DOMContentLoaded', () => {
    const openCreateEventPopupBtn = document.getElementById('openCreateEventPopup');
    const createEventPopup = document.getElementById('createEventPopup');
    const closeCreateEventPopupBtn = document.getElementById('closeCreateEventPopup');
    const createEventForm = document.getElementById('createEventForm');
    const eventsList = document.getElementById('eventsList');

    // Deschiderea popup-ului la clic pe buton
    openCreateEventPopupBtn.addEventListener('click', () => {
        createEventPopup.style.display = 'block';
    });

    // Închiderea popup-ului la clic pe butonul de închidere (X)
    closeCreateEventPopupBtn.addEventListener('click', () => {
        createEventPopup.style.display = 'none';
    });

    // Funcție pentru a afișa evenimentele
    function displayEvents(events) {
        eventsList.innerHTML = ''; // Curățăm lista de evenimente existente

        events.forEach((event) => {
            const li = document.createElement('li');
            li.classList.add('event-card');
            li.innerHTML = `
                <h3 class="event-title">${event.titlu}</h3>
                <p class="event-description">${event.descriere}</p>
            `;
            eventsList.appendChild(li);
        });
    }

    // Obțineți evenimentele existente și afișați-le la încărcarea paginii
    fetch('/recommended-events')
        .then((response) => response.json())
        .then((data) => {
            displayEvents(data); // Afișează evenimentele existente
        })
        .catch((error) => {
            console.error('Eroare la obținerea evenimentelor:', error);
        });

    // Trimiterea datelor către server la trimiterea formularului de creare eveniment
    createEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('eventTitle').value;
        const description = document.getElementById('eventDescription').value;
        const dateTime = document.getElementById('eventDateTime').value;

        try {
            const response = await fetch('/create-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titlu: title, descriere: description, data_eveniment: dateTime }),
            });

            const data = await response.json();
            console.log(data.message); // Mesajul primit de la server

            // Închideți popup-ul după ce evenimentul a fost creat cu succes
            createEventPopup.style.display = 'none';

            // Obțineți și afișați din nou evenimentele actualizate
            fetch('/recommended-events')
                .then((response) => response.json())
                .then((data) => {
                    displayEvents(data); // Afișează evenimentele actualizate
                })
                .catch((error) => {
                    console.error('Eroare la obținerea evenimentelor:', error);
                });
        } catch (error) {
            console.error('Eroare:', error);
        }
    });
});
