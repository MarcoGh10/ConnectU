function openEditFields() {
    // Verifică dacă elementul există
    const editNumeElement = document.querySelector('#edit_nume');
    const editEmailElement = document.querySelector('#edit_email');
    const editDataNastereElement = document.querySelector('#edit_data_nastere');
    const editLocatieElement = document.querySelector('#edit_locatie');

    if (editNumeElement && editEmailElement && editDataNastereElement && editLocatieElement) {
        // Afișează câmpurile de editare
        editNumeElement.style.display = 'inline-block';
        editEmailElement.style.display = 'inline-block';
        editDataNastereElement.style.display = 'inline-block';
        editLocatieElement.style.display = 'inline-block';

        // Ascunde butonul de editare
        document.getElementById('edit-button').style.display = 'none';
    } else {
        // Eroare: elementele nu există
        console.error('Unele elemente nu există.');
    }
}

function closeEditPopup() {
    // Ascunde câmpurile de editare
    document.getElementById('edit_nume').style.display = 'none';
    document.getElementById('edit_email').style.display = 'none';
    document.getElementById('edit_data_nastere').style.display = 'none';
    document.getElementById('edit_locatie').style.display = 'none';

    // Afișează butonul de editare
    document.getElementById('edit-button').style.display = 'inline-block';
}

function saveProfileChanges() {
    // Obține valorile câmpurilor de editare
    const nume = document.getElementById('edit_nume').value;
    const email = document.getElementById('edit_email').value;
    const data_nastere = document.getElementById('edit_data_nastere').value;
    const locatie = document.getElementById('edit_locatie').value;

    // Verificare dacă câmpurile sunt completate
    if (nume !== '' && email !== '' && data_nastere !== '' && locatie !== '') {
        // Trimite datele către server pentru a le salva în baza de date
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nume,
                email,
                data_nastere,
                locatie
            })
        };

        fetch('/update-user-profile', requestOptions)
            .then(response => response.json())
            .then(updatedData => {
                console.log('Profilul a fost actualizat:', updatedData);
                closeEditPopup(); // Închide câmpurile de editare după ce profilul a fost actualizat cu succes
            })
            .catch(error => {
                console.error('Eroare la salvarea datelor în baza de date:', error);
            });
    } else {
        console.error('Completați toate câmpurile pentru a salva profilul.');
    }
}

// Ascultător pentru butonul de editare
document.getElementById('edit-button').addEventListener('click', openEditFields);

// Ascultător pentru butonul de salvare
document.getElementById('save-profile-button').addEventListener('click', saveProfileChanges);
document.addEventListener('DOMContentLoaded', () => {
    const numeElement = document.getElementById('nume');
    const emailElement = document.getElementById('email');

    function fetchUserProfile() {
        fetch('/get-user-profile')  // Înlocuiește cu ruta corespunzătoare din server
            .then(response => response.json())
            .then(userProfile => {
                // Actualizează informațiile în HTML
                numeElement.textContent = userProfile.nume;
                emailElement.textContent = userProfile.email;
            })
            .catch(error => {
                console.error('Eroare la obținerea profilului utilizatorului:', error);
            });
    }

    fetchUserProfile();
});
