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
            // Poți afișa un mesaj de eroare sau gestiona altfel situația
        });
}

function saveProfileChanges() {
    // Colectare date din câmpurile de editare
    const editedProfile = {
        nume: document.getElementById("edit_nume").value,
        email: document.getElementById("edit_email").value,
        data_nastere: document.getElementById("edit_data_nastere").value,
        locatie: document.getElementById("edit_locatie").value
    };

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
        // Poți afișa un mesaj de succes sau gestiona altfel situația
        console.log('Profilul a fost actualizat:', updatedData);
    })
    .catch(error => {
        console.error('Eroare la salvarea datelor în baza de date:', error);
        // Poți afișa un mesaj de eroare sau gestiona altfel situația
    });

    // Închide pop-up-ul de editare
    closeEditPopup();
}
