function logout() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/logout');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Utilizatorul a fost deconectat
                window.location.href = 'login.html';
            } else if (xhr.status === 401) {
                // Utilizatorul nu este autorizat (deja deconectat sau sesiunea a expirat)
                console.log('Utilizatorul nu este autorizat. Poate este deja deconectat sau sesiunea a expirat.');
                // Poți redirecționa utilizatorul la pagina de login sau să faci alte acțiuni corespunzătoare
            } else {
                // Alte coduri de stare HTTP
                console.error('Eroare la deconectare. Cod de stare:', xhr.status);
            }
        }
    };
}

