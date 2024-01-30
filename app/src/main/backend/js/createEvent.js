async function createEvent() {
    try {
        const eventTitle = document.getElementById('eventTitle').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const eventDateTime = document.getElementById('eventDateTime').value;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titlu: eventTitle,
                descriere: eventDescription,
                data_eveniment: eventDateTime,
            }),
        };

        const response = await fetch('/create-event', requestOptions);
        const result = await response.json();

        if (response.ok) {
            console.log(result.message);
        } else {
            console.error('Eroare la crearea evenimentului:', result.error);
        }
    } catch (error) {
        console.error('Eroare la crearea evenimentului:', error);
    }
}
