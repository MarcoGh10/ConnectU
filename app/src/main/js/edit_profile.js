function openEditPopup() {
    // Afișează pop-up-ul de editare
    document.getElementById("edit-popup").style.display = "block";

    // Preiați valorile actuale și completați câmpurile de editare cu acestea
    document.getElementById("edit_nume").value = document.getElementById("nume").innerText;
    document.getElementById("edit_email").value = document.getElementById("email").innerText;
    document.getElementById("edit_data_nastere").value = document.getElementById("data_nastere").innerText;
    document.getElementById("edit_locatie").value = document.getElementById("locatie").innerText;
}

function closeEditPopup() {
    // Ascunde pop-up-ul de editare
    document.getElementById("edit-popup").style.display = "none";
}

function saveProfileChanges() {
    // Salvare modificări
    document.getElementById("nume").innerText = document.getElementById("edit_nume").value;
    document.getElementById("email").innerText = document.getElementById("edit_email").value;
    document.getElementById("data_nastere").innerText = document.getElementById("edit_data_nastere").value;
    document.getElementById("locatie").innerText = document.getElementById("edit_locatie").value;

    // Închide pop-up-ul de editare
    closeEditPopup();
}
