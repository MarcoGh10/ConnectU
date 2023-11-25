const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/frontend')));


app.use(session({
    secret: 'secretul_sesiunii',
    resave: false,
    saveUninitialized: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'connectu_db'
});

db.connect((err) => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err);
        return;
    }
    console.log('Conectat la baza de date MySQL');
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificați dacă utilizatorul există deja în baza de date
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Acest email este deja înregistrat.' });
        }

        // Hash parola utilizând bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Executați interogarea MySQL pentru a insera datele în baza de date
        const sql = 'INSERT INTO utilizatori (nume_utilizator, adresa_email, parola) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Eroare la inserarea datelor:', err);
                res.status(500).json({ error: 'Eroare la înregistrare' });
                return;
            }

            console.log('Înregistrare reușită');
            res.redirect('/home'); // Redirecționează către pagina de home după înregistrare reușită
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Eroare la înregistrare' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Obțineți utilizatorul din baza de date după adresa de email
        const user = await getUserByEmail(email);

        // Verificați dacă există utilizatorul și dacă parola este corectă utilizând bcrypt
        const isPasswordValid = user ? await bcrypt.compare(password, user.parola) : false;

        if (!user || !isPasswordValid) {
            return res.status(401).json({ error: 'Adresa de email sau parolă incorectă.' });
        }

        // Setarea sesiunii pentru a simula autentificarea
        req.session.user = { id: user.id, username: user.nume_utilizator, email: user.adresa_email };

        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Eroare la autentificare' });
    }
});

// Funcție pentru a obține utilizatorul din baza de date după adresa de email
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

app.get('/home', async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.redirect('/login.html');
        }

        res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Eroare la afișarea paginii home' });
    }
});


app.post('/create-event', async (req, res) => {
    try {
        const { titlu, descriere, data_eveniment } = req.body;

        // Execută interogarea MySQL pentru a insera datele evenimentului
        const sql = 'INSERT INTO evenimente (titlu, descriere, data_eveniment) VALUES (?, ?, ?)';
        db.query(sql, [titlu, descriere, data_eveniment], (err, result) => {
            if (err) {
                console.error('Eroare la inserarea evenimentului:', err);
                res.status(500).json({ error: 'Eroare la crearea evenimentului' });
                return;
            }

            console.log('Eveniment creat cu succes');
            res.status(200).json({ message: 'Eveniment creat cu succes' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Eroare la crearea evenimentului' });
    }
});

app.get('/recommended-events', async (req, res) => {
    try {
        const sql = 'SELECT * FROM evenimente';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Eroare la obținerea evenimentelor:', err);
                res.status(500).json({ error: 'Eroare la obținerea evenimentelor' });
                return;
            }

            console.log('Evenimentele obținute cu succes');
            res.status(200).json(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Eroare la obținerea evenimentelor' });
    }
});

// Funcție pentru a obține evenimentele recomandate
function getRecommendedEvents() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM evenimente';
        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/login.html'));
});


app.listen(port, () => {
    console.log(`Serverul ruleaza pe http://localhost:${port}`);
});
