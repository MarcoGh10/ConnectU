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
    user: 'root',
    password: 'Marco12345',
    database: 'connectu_db'
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

const express = require('express');
const bodyParser = require('body-parser');
// Middleware pentru a parsa corpul cererilor HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Funcție middleware de verificare a autentificării
function verificaAutentificare(req, res, next) {
    // Aici ar trebui să verificați dacă utilizatorul este autentificat, de exemplu, folosind sesiuni sau token-uri JWT
    // În exemplul de mai jos, verificăm doar dacă există un utilizator simulat într-o variabilă de sesiune
    if (!req.session || !req.session.user) {
        // Utilizatorul nu este autentificat, redirecționează către pagina de autentificare
        return res.redirect('/login.html');
    }
    next();
}

// Rute pentru pagini
app.get('/', verificaAutentificare, (req, res) => {
    // Pagina principală (doar accesibilă utilizatorilor autentificați)
    res.sendFile(__dirname + '/home.html');
});

app.get('/login.html', (req, res) => {
    // Pagina de autentificare
    res.sendFile(__dirname + '/login.html');
});

// Rute pentru autentificare și înregistrare
app.post('/login', (req, res) => {
    // Procesează autentificarea și redirecționează la pagina principală dacă este reușită
    // Aici trebuie să verificați credențialele utilizatorului și să îl autentificați într-un mod adecvat
    // În exemplul de mai jos, doar setăm o variabilă de sesiune pentru a simula autentificarea
    req.session.user = { username: req.body.username };
    res.redirect('/');
});

// Alte rute pentru înregistrare, deconectare, etc.

// Porniți serverul
app.listen(port, () => {
    console.log(`Serverul ascultă la adresa http://localhost:${port}`);
});
