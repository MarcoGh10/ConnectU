// Adaugă acest cod în fișierul delete_account.js

function deleteAccount() {
    // Afișează un mesaj de confirmare înainte de a efectua ștergerea
    const confirmDelete = confirm("Sunteți sigur că doriți să ștergeți contul? Această acțiune este ireversibilă.");

    if (confirmDelete) {
        // Efectuează solicitarea către ruta de ștergere a contului
        fetch('/delete-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Eroare la ștergerea contului');
                }
                return response.json();
            })
            .then(data => {
                // Succes - redirecționează către pagina de login sau altă pagină
                alert('Contul a fost șters cu succes. Vei fi deconectat.');
                window.location.href = '/login.html';
            })
            .catch(error => {
                // Manejează erorile în caz de problemă
                console.error('Eroare la ștergerea contului:', error);
                alert('Eroare la ștergerea contului. Vă rugăm să încercați din nou mai târziu.');
            });
    }
}
