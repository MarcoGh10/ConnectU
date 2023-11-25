// Verifică dacă utilizatorul este logat și dacă câmpurile nu sunt goale
function checkIfLoggedInAndNotEmpty() {
    // Simulați o verificare a stării de conectare (aceasta depinde de logica backend-ului)
    const isLoggedIn = true; // Setează la true dacă utilizatorul este autentificat

    // Verifică dacă câmpurile de conectare nu sunt goale
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLoggedIn) {

        window.location.href = '/home'; // Redirecționează către pagina de home
    } else {
        // Redirecționează la pagina de conectare dacă utilizatorul nu este autentificat
        if (email.trim() === '' || password.trim() === '') {
            alert('Completați toate câmpurile!');
        } else {
            window.location.href = 'login.html';
        }
    }
}

// Apelarea funcției de verificare la încărcarea paginii
window.onload = checkIfLoggedInAndNotEmpty;
