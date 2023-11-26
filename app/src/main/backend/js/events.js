document.addEventListener('DOMContentLoaded', () => {
    const openCreateEventPopupBtn = document.getElementById('openCreateEventPopup');
    const createEventPopup = document.getElementById('createEventPopup');
    const closeCreateEventPopupBtn = document.getElementById('closeCreateEventPopup');
    const createEventForm = document.getElementById('createEventForm');
    const eventsList = document.getElementById('eventsList');

    openCreateEventPopupBtn.addEventListener('click', () => {
        openPopup(createEventPopup);
    });

    closeCreateEventPopupBtn.addEventListener('click', () => {
        closePopup(createEventPopup);
    });

    createEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const eventData = collectEventData(); // Colectarea datelor evenimentului din formular

        try {
            const response = await saveEventData('/create-event', eventData);
            handleEventCreation(response, createEventPopup, eventsList);
        } catch (error) {
            console.error('Eroare:', error);
        }
    });

    function openPopup(popupElement) {
        popupElement.style.display = 'block';
    }

    function closePopup(popupElement) {
        popupElement.style.display = 'none';
    }

    function collectEventData() {
        const title = document.getElementById('eventTitle').value;
        const description = document.getElementById('eventDescription').value;
        const dateTime = document.getElementById('eventDateTime').value;

        return { titlu: title, descriere: description, data_eveniment: dateTime };
    }

    async function saveEventData(url, data) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    async function handleEventCreation(response, popupElement, listElement) {
        const data = await response.json();
        console.log(data.message);

        closePopup(popupElement);
        refreshEventsList(listElement);
    }

    function refreshEventsList(listElement) {
        fetch('/recommended-events')
            .then((response) => response.json())
            .then((data) => {
                displayEvents(data, listElement);
            })
            .catch((error) => {
                console.error('Eroare la obținerea evenimentelor:', error);
            });
    }

    function displayEvents(events, listElement) {
        listElement.innerHTML = '';

        events.forEach((event) => {
            const li = document.createElement('li');
            li.classList.add('event-card');
            li.innerHTML = `
                <h3 class="event-title">${event.titlu}</h3>
                <p class="event-description">${event.descriere}</p>
            `;
            listElement.appendChild(li);
        });
    }
s
    closeCreateEventPopupBtn.addEventListener('click', () => {
        closePopup(createEventPopup);
    });
});
