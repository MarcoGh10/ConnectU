const closeButton = document.getElementById("closeEditPopupButton");

closeButton.addEventListener("click", () => {
    closeEditPopup();
});


function openEditPopup() {
    // Afișează pop-up-ul de editare
    document.getElementById("edit-popup").style.display = "block";

    // Preluare date din baza de date
    fetch('/get-user-profile') // Endpoint-ul către care trimiți cererea pentru profilul utilizatorului
        .then(response => response.json())
        .then(profileData => {  
            // Completează câmpurile de editare cu datele din baza de date
            document.getElementById("edit_nume").value = profileData.nume;
            document.getElementById("edit_email").value = profileData.email;
            document.getElementById("edit_data_nastere").value = profileData.data_nastere;
            document.getElementById("edit_locatie").value = profileData.locatie;
        })
        .catch(error => {
            console.error('Eroare la preluarea datelor din baza de date:', error);
        });
}
function closeEditPopup() {
    document.getElementById("edit-popup").style.display = "none";
}

function saveProfileChanges() {
    const editedProfile = {
        nume: document.getElementById("edit_nume").value,
        email: document.getElementById("edit_email").value,
        data_nastere: document.getElementById("edit_data_nastere").value,
        locatie: document.getElementById("edit_locatie").value
    };

    // Verificare dacă câmpurile sunt completate
    if (editedProfile.nume !== '' && editedProfile.email !== '' && editedProfile.data_nastere !== '' && editedProfile.locatie !== '') {
        // Trimite datele către server pentru a le salva în baza de date
        fetch('/update-user-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedProfile)
        })
        .then(response => response.json())
        .then(updatedData => {
            console.log('Profilul a fost actualizat:', updatedData);
            closeEditPopup(); // Închide pop-up-ul după ce profilul a fost actualizat cu succes
        })
        .catch(error => {
            console.error('Eroare la salvarea datelor în baza de date:', error);
        });
    } else {
        console.error('Completați toate câmpurile pentru a salva profilul.');
    }
}
