const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware pentru a parsa corpul cererilor HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurați conexiunea la baza de date
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nume_utilizator',
    password: 'parola',
    database: 'nume_baza_de_date'
});

// Conectați-vă la baza de date
db.connect((err) => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err);
        return;
    }
    console.log('Conectat la baza de date MySQL');
});

// Rute pentru înregistrare
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Hash parola sau folosiți altă metodă de securitate
    const hashedPassword = password; // Adăugați logica de hash aici

    // Executați interogarea MySQL pentru a insera datele
    const sql = `INSERT INTO utilizatori (nume_utilizator, adresa_email, parola) VALUES ('${username}', '${email}', '${hashedPassword}')`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Eroare la inserarea datelor:', err);
            res.status(500).send('Eroare la înregistrare');
            return;
        }

        console.log('Înregistrare reușită');
        res.status(200).send('Înregistrare reușită');
    });
});

// Porniți serverul
app.listen(port, () => {
    console.log(`Serverul ascultă la adresa http://localhost:${port}`);
});
