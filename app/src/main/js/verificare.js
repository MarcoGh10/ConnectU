function register() {
    const username = document.getElementsByName('username')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;
    const conpassword = document.getElementsByName('conpassword')[0].value;

    // Validați dacă parolele coincid
    if (password !== conpassword) {
        alert('Parolele nu coincid');
        return;
    }

    // Trimiteți datele la server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        // Aici puteți redirecționa la altă pagină sau face alte acțiuni
    })
    .catch(error => {
        console.error('Eroare la înregistrare:', error);
        alert('Eroare la înregistrare');
    });
}
