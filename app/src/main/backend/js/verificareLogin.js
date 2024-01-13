
function checkIfLoggedInAndNotEmpty() {
    // Verifică dacă câmpurile de conectare nu sunt goale
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email.trim() === '' || password.trim() === '') {
        alert('Completați toate câmpurile!');
        return;
    }

    // Verifică dacă utilizatorul este autentificat
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        // Utilizatorul este autentificat, așa că redirecționează la pagina de pornire
        window.location.href ='/home';
        return;
    }

    // Utilizatorul nu este autentificat, așa că redirecționează la pagina de conectare
    window.location.href = 'login.html';
}
window.onload = checkIfLoggedInAndNotEmpty;