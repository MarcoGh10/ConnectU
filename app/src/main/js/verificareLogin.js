// Verifică dacă utilizatorul este logat și dacă câmpurile nu sunt goale
function checkIfLoggedInAndNotEmpty() {
    // Simulați o verificare a stării de conectare (aceasta depinde de logica backend-ului)
    const isLoggedIn = false; // Setați la true dacă utilizatorul este autentificat

    // Verifică dacă câmpurile de conectare nu sunt goale
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isLoggedIn) {
        // Utilizatorul este autentificat, continuați normal
    } else {
        // Redirecționează la pagina de conectare dacă utilizatorul nu este autentificat
        if (username.trim() === '' || password.trim() === '') {
            alert('Completați toate câmpurile!');
        } else {
            window.location.href = 'login.html';
        }
    }
}

// Apelați funcția de verificare la încărcarea paginii
window.onload = checkIfLoggedInAndNotEmpty;

