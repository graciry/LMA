const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@24',
    database: 'learning_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/courses', (req, res) => {
    if (req.session.loggedin) {
        db.query('SELECT * FROM courses', (err, results) => {
            if (err) throw err;
            res.render('course-content', { courses: results });
        });
    } else {
        res.send('Please login to view this page!');
    }
});

app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, match) => {
                    if (match) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        res.redirect('/courses');
                    } else {
                        res.send('Incorrect Password!');
                    }
                });
            } else {
                res.send('Username not found!');
            }
        });
    } else {
        res.send('Please enter Username and Password!');
    }
});

// Listening to the port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
