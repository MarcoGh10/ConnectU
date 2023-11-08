// Referință către elementul butonului de editare
const editButton = document.getElementById("edit-button");

// Ascultă evenimentul de clic pe butonul de editare
editButton.addEventListener("click", function() {
    // Permite editarea câmpurilor de text
    document.getElementById("nume").contentEditable = true;
    document.getElementById("email").contentEditable = true;
    document.getElementById("data_nastere").contentEditable = true;
    document.getElementById("locatie").contentEditable = true;

    // Dezactivează butonul de editare
    editButton.disabled = true;
});
