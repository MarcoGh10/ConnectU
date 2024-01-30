document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/get-user-profile');
        const userData = await response.json();

        // Actualizați elementul HTML cu numele utilizatorului din baza de date
        const usernameElement = document.getElementById('nume_utilizator');

        if (userData && userData.nume_utilizator) {
            usernameElement.textContent = userData.nume_utilizator;
        } else {
            usernameElement.textContent = 'Utilizator necunoscut';
        }
    } catch (error) {
        console.error('Eroare la obținerea profilului utilizatorului:', error);
    }
});
