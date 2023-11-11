const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const port = 3000;
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/mesaje.html'));
});
// Middleware pentru a parsa corpul cererilor HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pentru sesiuni
app.use(session({
    secret: 'secretul_sesiunii',
    resave: false,
    saveUninitialized: true
}));

// Configurați conexiunea la baza de date
const db = mysql.createConnection({
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
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
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificați dacă utilizatorul există deja
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Acest email este deja înregistrat.' });
        }

        // Hash parola
        const hashedPassword = await bcrypt.hash(password, 10);

        // Executați interogarea MySQL pentru a insera datele
        const sql = 'INSERT INTO utilizatori (nume_utilizator, adresa_email, parola) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Eroare la inserarea datelor:', err);
                res.status(500).json({ error: 'Eroare la înregistrare' });
                return;
            }

            console.log('Înregistrare reușită');
            res.status(200).json({ message: 'Înregistrare reușită' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Eroare la înregistrare' });
    }
});

// Rute pentru autentificare și deconectare
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Obțineți utilizatorul după adresa de email
        const user = await getUserByEmail(email);

        // Verificați parola utilizatorului (utilizând bcrypt.compare)
        const isPasswordValid = user ? await bcrypt.compare(password, user.parola) : false;

        if (!user || !isPasswordValid) {
            return res.status(401).json({ error: 'Adresa de email sau parolă incorectă.' });
        }

        // Setăm sesiunea pentru a simula autentificarea
        req.session.user = { id: user.id, username: user.nume_utilizator, email: user.adresa_email };

        res.status(200).json({ message: 'Autentificare reușită' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Eroare la autentificare' });
    }
});

// Rute pentru pagini
app.get('/', verificaAutentificare, (req, res) => {
    // Pagina principală (doar accesibilă utilizatorilor autentificați)
    res.sendFile(__dirname + '/home.html');
});

app.get('/login.html', (req, res) => {
    // Pagina de autentificare
    res.sendFile(__dirname + '/login.html');
});

// Funcție middleware de verificare a autentificării
function verificaAutentificare(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.redirect('/login.html');
    }
    next();
}

// Funcție pentru a obține utilizatorul după adresa de email
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM utilizatori WHERE adresa_email = ?';
        db.query(sql, [email], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            if (results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
}
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });
  
  app.listen(port, () => {
    console.log(`Serverul ascultă la adresa http://localhost:${port}`);
});
