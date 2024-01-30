document.addEventListener('DOMContentLoaded', async () => {
    const eventsList = document.getElementById('eventsList');
    const joinedEventsList = document.getElementById('joinedEventsList');
    const myEventsList = document.getElementById('myEventsList');

    const openCreateEventPopupButton = document.getElementById('openCreateEventPopup');
    const closeCreateEventPopupButton = document.getElementById('closeCreateEventPopup');
    const createEventForm = document.getElementById('createEventForm');

    openCreateEventPopupButton.addEventListener('click', () => openPopup('createEventPopup'));
    closeCreateEventPopupButton.addEventListener('click', () => closePopup('createEventPopup'));

    createEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await createEvent();
        closePopup('createEventPopup');
    });

    async function createEventListItem(event, container) {
        const listItem = document.createElement('li');
        listItem.classList.add('event-card');

        listItem.innerHTML = `
            <div>
                <strong>${event.titlu}</strong>
                <p>${event.descriere}</p>
                <p>Data și oră: ${event.data_eveniment}</p>
            </div>
            <button class="delete-button" onclick="deleteEvent(${event.id}, '${container.id}')">Șterge Eveniment</button>
        `;

        container.appendChild(listItem);
    }

    async function deleteEvent(eventId, containerId) {
        try {
            const response = await fetch(`/delete-event/${eventId}`, { method: 'DELETE' });
            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                if (containerId === 'eventsList') {
                    await displayEvents();
                } else if (containerId === 'joinedEventsList') {
                    await displayJoinedEvents();
                } else if (containerId === 'myEventsList') {
                    await displayMyEvents();
                }
            } else {
                console.error('Eroare la ștergerea evenimentului:', result.error);
            }
        } catch (error) {
            console.error('Eroare la ștergerea evenimentului:', error);
        }
    }

    async function clearList(list) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'block';
        }
    }

    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'none';
        }
    }

    async function displayEvents() {
        try {
            const response = await fetch('/get-events');
            const eventsData = await response.json();
            clearList(eventsList);
            eventsData.forEach(event => createEventListItem(event, eventsList));
        } catch (error) {
            console.error('Eroare la afișarea evenimentelor:', error);
        }
    }

    async function displayJoinedEvents() {
        try {
            const response = await fetch('/get-joined-events');
            const joinedEventsData = await response.json();
            clearList(joinedEventsList);
            joinedEventsData.forEach(event => createEventListItem(event, joinedEventsList));
        } catch (error) {
            console.error('Eroare la afișarea evenimentelor la care a aderat utilizatorul:', error);
        }
    }

    async function displayMyEvents() {
        try {
            const response = await fetch('/get-my-events');
            const myEventsData = await response.json();
            clearList(myEventsList);
            myEventsData.forEach(event => createEventListItem(event, myEventsList));
        } catch (error) {
            console.error('Eroare la afișarea evenimentelor create de utilizator:', error);
        }
    }

    // Inițializare afișare evenimente
    displayEvents();
    displayJoinedEvents();
    displayMyEvents();
});
