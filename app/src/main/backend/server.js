const http = require('http');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const server = http.createServer(app);

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js'), { "Content-Type": `text/javascript` }));


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
async function sendConfirmationEmail(email) {
    try {
        const mailOptions = {
            from: 'freverfan@gmail.com',
            to: email,
            subject: 'Confirmare creare cont',
            text: 'Bine ai venit! Contul tău a fost creat cu succes.',
        };

        // Trimite e-mailul
        await transporter.sendMail(mailOptions);

        console.log('E-mail de confirmare trimis cu succes');
        // Întoarce o valoare sau execută o acțiune suplimentară dacă este necesar
    } catch (error) {
        console.error('Eroare la trimiterea e-mailului de confirmare:', error);
        // Gestionați eroarea într-un mod adecvat, de exemplu, aruncând o excepție sau returnând o valoare de eroare
        throw error;
    }
}


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
        db.query(sql, [username, email, hashedPassword], (err) => {
            if (err) {
                console.error('Eroare la inserarea datelor:', err);
                res.status(500).json({ error: 'Eroare la înregistrare' });
                return;
            }

            console.log('Înregistrare reușită');
            res.redirect('/home');
        });
        await sendConfirmationEmail(email);
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


app.post('/logout', (req, res) => {
    try {
        // Verifică dacă utilizatorul este autentificat
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Nu există sesiune autentificată' });
        }

        // Distrugerea sesiunii pentru a realiza deconectarea
        req.session.destroy((err) => {
            if (err) {
                console.error('Eroare la deconectare:', err);
                res.status(500).json({ error: 'Eroare la deconectare' });
            } else {
                console.log('Deconectare reușită');
                res.status(200).json({ message: 'Deconectare reușită' });
            }
        });
    } catch (error) {
        console.error('Eroare la deconectare:', error);
        res.status(500).json({ error: 'Eroare la deconectare' });
    }
});

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

app.get('/get-user-profile', async (req, res) => {
    try {
        const userEmail = req.session.user.email; // Adresa de email a utilizatorului autentificat

        const userProfile = await getUserByEmail(userEmail); // Obține profilul utilizatorului după email

        if (!userProfile) {
            return res.status(404).json({ error: 'Profilul utilizatorului nu a fost găsit' });
        }

        // Trimite datele profilului utilizatorului către client (interfața de utilizator)
        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Eroare la obținerea profilului utilizatorului:', error);
        res.status(500).json({ error: 'Eroare la obținerea datelor din baza de date' });
    }
});

// Configurare pentru serviciul de e-mail (înlocuiește cu detaliile tale)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ghiriti11@gmail.com',
        pass: 'Marco180602',
    },
});

app.post('/delete-account', async (req, res) => {
    try {
        // Verifică dacă utilizatorul este autentificat (poți folosi middleware-ul de autentificare a sesiunii)
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Nu există sesiune autentificată' });
        }

        const userId = req.session.user.id;

        // Execută interogarea MySQL pentru ștergerea utilizatorului din baza de date
        const deleteSql = 'DELETE FROM utilizatori WHERE id = ?';
        db.query(deleteSql, [userId], (deleteErr, deleteResult) => {
            if (deleteErr) {
                console.error('Eroare la ștergerea contului din baza de date:', deleteErr);
                res.status(500).json({ error: 'Eroare la ștergerea contului' });
            } else {
                console.log('Contul a fost șters cu succes');
                // Distrugerea sesiunii pentru a realiza deconectarea
                req.session.destroy((destroyErr) => {
                    if (destroyErr) {
                        console.error('Eroare la deconectare:', destroyErr);
                        res.status(500).json({ error: 'Eroare la deconectare' });
                    } else {
                        console.log('Deconectare reușită');
                        res.status(200).json({ message: 'Contul a fost șters cu succes și deconectat' });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Eroare la ștergerea contului:', error);
        res.status(500).json({ error: 'Eroare la ștergerea contului' });
    }
});
